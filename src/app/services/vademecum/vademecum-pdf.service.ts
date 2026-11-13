import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFObject,
  PDFRef,
  PDFStream,
} from 'pdf-lib';

/** Worker de pdf.js copiado como asset en angular.json (build legacy, compatible con webpack 4). */
pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.min.js';

/** El encabezado está arriba: solo se leen las líneas que empiezan en este tercio superior. */
const HEADER_REGION = 0.3;
const THUMBNAIL_WIDTH = 240;
const THUMBNAIL_QUALITY = 0.72;
/**
 * Claves de página que no se imprimen ni se ven y que pdf-lib copiaría con cada ficha.
 * Los compendios vienen de Illustrator: /PieceInfo guarda el archivo editable completo
 * (medido: 15 MB en Ingenio 3.º-4.º, 33 MB en Lectura troquel) y cada ficha lo arrastraba.
 * /Thumb es una miniatura interna del PDF.
 */
const DISCARDED_PAGE_KEYS = ['PieceInfo', 'Thumb'];

export class InvalidPdfError extends Error {}

/**
 * Compendio abierto en el navegador: nunca se envía al servidor (BO-04 rehecho).
 *
 * Memoria: el compendio no se tiene dos veces. pdf.js (lector) se usa para encabezados y
 * miniaturas y se libera con `releaseReader`; pdf-lib (para separar) vuelve a leer el
 * archivo del disco solo al armar la primera ficha y se libera con `releaseWriter`.
 */
export interface OpenedCompendium {
  pageCount: number;
  /** Miniatura (data URL JPEG) de una página, de 0 a pageCount - 1. Requiere el lector. */
  thumbnail(index: number): Promise<string>;
  /** Líneas de texto del tercio superior, de arriba abajo. Requiere el lector. */
  topLines(index: number): Promise<string[]>;
  /** Libera pdf.js (el documento y su worker); después solo se puede separar. */
  releaseReader(): void;
  /** PDF nuevo solo con esas páginas, en ese orden. */
  extract(pages: number[]): Promise<Blob>;
  /** Libera pdf-lib; se vuelve a cargar si hace falta otra ficha. */
  releaseWriter(): void;
  close(): void;
}

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
}

/** Borde superior de una pieza de texto (y PDF crece hacia arriba; transform[5] es la base). */
function topOf(item: TextItem): number {
  return item.transform[5] + (item.height || Math.abs(item.transform[3]) || 0);
}

/**
 * Borra del documento los objetos a los que ya no llega nada desde el catálogo (los datos de
 * Illustrator tras quitar /PieceInfo). pdf-lib copia en memoria el contenido de cada objeto;
 * así el navegador no guarda 15–33 MB que nunca se usan. Devuelve cuántos borró.
 */
function dropUnreachable(document: PDFDocument): number {
  const context = document.context;
  const reachable = new Set<string>();
  const pending: PDFObject[] = [context.trailerInfo.Root, context.trailerInfo.Info].filter(Boolean);
  while (pending.length) {
    const object = pending.pop();
    if (object instanceof PDFRef) {
      const key = object.toString();
      if (!reachable.has(key)) {
        reachable.add(key);
        const target = context.lookup(object);
        if (target) {
          pending.push(target);
        }
      }
    } else if (object instanceof PDFDict) {
      object.entries().forEach(([, value]) => pending.push(value));
    } else if (object instanceof PDFArray) {
      object.asArray().forEach((value) => pending.push(value));
    } else if (object instanceof PDFStream) {
      pending.push(object.dict);
    }
  }
  let dropped = 0;
  context.enumerateIndirectObjects().forEach(([ref]) => {
    if (!reachable.has(ref.toString())) {
      context.delete(ref);
      dropped++;
    }
  });
  return dropped;
}

@Injectable({
  providedIn: 'root',
})
export class VademecumPdfService {
  async open(file: File): Promise<OpenedCompendium> {
    let reader: any;
    try {
      // pdf.js transfiere el buffer a su worker: no queda una copia en la página
      reader = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    } catch (error) {
      throw new InvalidPdfError(
        error && error.name === 'PasswordException'
          ? 'El PDF está protegido con contraseña.'
          : 'El archivo está dañado o no es un PDF válido.',
      );
    }
    if (!reader.numPages) {
      reader.destroy();
      throw new InvalidPdfError('El PDF no tiene páginas.');
    }

    let writer: Promise<PDFDocument> | null = null;
    const loadWriter = () =>
      (writer =
        writer ||
        file
          .arrayBuffer()
          .then((buffer) => PDFDocument.load(buffer, { ignoreEncryption: true }))
          .then((original) => {
            original.getPages().forEach((page) =>
              DISCARDED_PAGE_KEYS.forEach((key) => page.node.delete(PDFName.of(key))),
            );
            dropUnreachable(original);
            return original;
          }));
    const requireReader = () => {
      if (!reader) {
        throw new Error('El lector del compendio ya se liberó.');
      }
      return reader;
    };

    return {
      pageCount: reader.numPages,
      thumbnail: (index) => this.thumbnail(requireReader(), index),
      topLines: (index) => this.topLines(requireReader(), index),
      releaseReader: () => {
        if (reader) {
          reader.destroy();
          reader = null;
        }
      },
      extract: async (pages) => {
        const original = await loadWriter();
        const target = await PDFDocument.create();
        const copied = await target.copyPages(original, pages);
        copied.forEach((page) => target.addPage(page));
        // Sin pausas cada 50 objetos: una ficha son pocos objetos y así tarda menos
        const data = await target.save({ objectsPerTick: Infinity });
        return new Blob([data], { type: 'application/pdf' });
      },
      releaseWriter: () => (writer = null),
      close: () => {
        if (reader) {
          reader.destroy();
          reader = null;
        }
        writer = null;
      },
    };
  }

  private async thumbnail(document: any, index: number): Promise<string> {
    const page = await document.getPage(index + 1);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: THUMBNAIL_WIDTH / base.width });
    const canvas = window.document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const url = canvas.toDataURL('image/jpeg', THUMBNAIL_QUALITY);
    // El canvas se vacía para que el navegador libere su memoria de inmediato
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
    return url;
  }

  private async topLines(document: any, index: number): Promise<string[]> {
    const page = await document.getPage(index + 1);
    const { height } = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    // Coordenadas PDF: y crece hacia arriba. Tercio superior = y alta.
    // Orden por borde superior, como PyMuPDF: el nombre del tipo usa letra más grande y su
    // línea base queda más abajo que la del número aunque esté visualmente arriba
    const limit = height * (1 - HEADER_REGION);
    const items = (content.items as TextItem[])
      .filter((item) => item.str && item.str.trim() && topOf(item) >= limit)
      .sort((a, b) => topOf(b) - topOf(a) || a.transform[4] - b.transform[4]);

    // Una línea = piezas a la misma altura (±2 pt). Se agrega un espacio solo si hay hueco
    // entre piezas, para no partir palabras ("Matem" + "ático")
    const lines: { y: number; top: number; items: TextItem[] }[] = [];
    for (const item of items) {
      const y = item.transform[5];
      const line = lines.find((candidate) => Math.abs(candidate.y - y) <= 2);
      if (line) {
        line.items.push(item);
        line.top = Math.max(line.top, topOf(item));
      } else {
        lines.push({ y, top: topOf(item), items: [item] });
      }
    }
    page.cleanup();
    lines.sort((a, b) => b.top - a.top);
    return lines.map((line) => {
      const sorted = line.items.sort((a, b) => a.transform[4] - b.transform[4]);
      let text = '';
      let end: number | null = null;
      for (const item of sorted) {
        const x = item.transform[4];
        const fontSize = Math.abs(item.transform[0]) || 10;
        if (end !== null && x - end > fontSize * 0.15 && !text.endsWith(' ') && !item.str.startsWith(' ')) {
          text += ' ';
        }
        text += item.str;
        end = x + item.width;
      }
      return text;
    });
  }
}
