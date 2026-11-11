import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocument, PDFName } from 'pdf-lib';

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

/** Compendio abierto en el navegador: nunca se envía al servidor (BO-04 rehecho). */
export interface OpenedCompendium {
  pageCount: number;
  /** Miniatura (data URL JPEG) de una página, de 0 a pageCount - 1. */
  thumbnail(index: number): Promise<string>;
  /** Líneas de texto del tercio superior, de arriba abajo y de izquierda a derecha. */
  topLines(index: number): Promise<string[]>;
  /** PDF nuevo solo con esas páginas, en ese orden. */
  extract(pages: number[]): Promise<Blob>;
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

@Injectable({
  providedIn: 'root',
})
export class VademecumPdfService {
  async open(file: File): Promise<OpenedCompendium> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let document: any;
    try {
      // pdf.js se queda con el buffer que recibe: se le pasa una copia
      document = await pdfjs.getDocument({ data: bytes.slice() }).promise;
    } catch (error) {
      throw new InvalidPdfError(
        error && error.name === 'PasswordException'
          ? 'El PDF está protegido con contraseña.'
          : 'El archivo está dañado o no es un PDF válido.',
      );
    }
    if (!document.numPages) {
      document.destroy();
      throw new InvalidPdfError('El PDF no tiene páginas.');
    }
    let source: Promise<PDFDocument> | null = null;
    const loadSource = () =>
      (source =
        source ||
        PDFDocument.load(bytes, { ignoreEncryption: true }).then((original) => {
          original.getPages().forEach((page) =>
            DISCARDED_PAGE_KEYS.forEach((key) => page.node.delete(PDFName.of(key))),
          );
          return original;
        }));

    return {
      pageCount: document.numPages,
      thumbnail: (index) => this.thumbnail(document, index),
      topLines: (index) => this.topLines(document, index),
      extract: async (pages) => {
        const original = await loadSource();
        const target = await PDFDocument.create();
        const copied = await target.copyPages(original, pages);
        copied.forEach((page) => target.addPage(page));
        const data = await target.save();
        return new Blob([data], { type: 'application/pdf' });
      },
      close: () => document.destroy(),
    };
  }

  private async thumbnail(document: any, index: number): Promise<string> {
    const page = await document.getPage(index + 1);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: THUMBNAIL_WIDTH / base.width });
    const canvas = window.document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;
    const url = canvas.toDataURL('image/jpeg', THUMBNAIL_QUALITY);
    page.cleanup();
    return url;
  }

  private async topLines(document: any, index: number): Promise<string[]> {
    const page = await document.getPage(index + 1);
    const { height } = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    // Coordenadas PDF: y crece hacia arriba. Tercio superior = y alta
    const limit = height * (1 - HEADER_REGION);
    // Orden por borde superior, como PyMuPDF: el nombre del tipo usa letra más grande y su
    // línea base queda más abajo que la del número aunque esté visualmente arriba
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
