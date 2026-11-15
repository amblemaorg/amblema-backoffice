import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx-js-style';

import { IMAGE } from '../img-base-64';
import { HqsAwardReport, HqsAwardSchool } from 'src/app/_models/report/hqs-award-report.model';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GREEN = '#81b03e';
const PDF_FONT_SIZE = 8; // defaultStyle.fontSize del PDF
const LINE_HEIGHT_FACTOR = 1.17; // Roboto
const TITLE = '#2e8aaa';
const NOTE =
  'Índice Integral = promedio de IAA, PPM, M2M y 60LM del lapso 3 (máximo 100 cada uno; IAA ' +
  'convertido de 35 puntos a %). Premio: Oro ≥ 80, Plata ≥ 60, Bronce ≥ 40.';
// Mismos colores que las insignias de la pantalla
const AWARD_COLORS: { [key: string]: string } = {
  gold: '#d4af37',
  silver: '#a8a9ad',
  bronze: '#cd7f32',
  none: '#e4e9f2',
  incomplete: '#e4e9f2',
};

@Injectable()
export class HqsAwardReportExport {
  private readonly tableLayout = {
    hLineColor: () => '#00722e',
    vLineColor: () => '#00722e',
    paddingLeft: () => 3,
    paddingRight: () => 3,
  };

  // ---------------------------------------------------------------- helpers

  private num(value: number | null): string {
    if (value === null || value === undefined) {
      return '—';
    }
    return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(/\.?0+$/, '');
  }

  private awardColor(school: HqsAwardSchool): string {
    return AWARD_COLORS[school.award ? school.award : school.status];
  }

  private fileName(report: HqsAwardReport, ext: string): string {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const now = new Date();
    const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(
      now.getHours()
    )}-${pad(now.getMinutes())}`;
    const year = (report.schoolYear.name || '').replace(/[^0-9A-Za-z-]+/g, '');
    return `Reporte-premios-HQS-${year}_${date}.${ext}`;
  }

  /**
   * Cabecera con el texto centrado también en vertical. pdfmake 0.2 no tiene alineación
   * vertical en celdas: se compensa con margen arriba y abajo según los saltos de línea
   * (\n) de cada título frente al título más alto de la fila.
   */
  private header(texts: string[], color: string = GREEN, fontSize: number = PDF_FONT_SIZE): any[] {
    const lineHeight = fontSize * LINE_HEIGHT_FACTOR;
    const lineCount = (text: string) => text.split('\n').length;
    const maxLines = Math.max(...texts.map(lineCount));
    return texts.map((text) => {
      const margin = ((maxLines - lineCount(text)) * lineHeight) / 2;
      return {
        text,
        bold: true,
        color: '#FFF',
        fillColor: color,
        alignment: 'center',
        margin: [0, margin, 0, margin],
      };
    });
  }

  /** pdfmake no avisa si falla en segundo plano: se libera el botón tras un tiempo prudente. */
  private withTimeout(promise: Promise<void>, ms: number = 120000): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Tiempo de espera agotado al generar el archivo')), ms);
      promise.then(
        () => {
          clearTimeout(timer);
          resolve();
        },
        (e) => {
          clearTimeout(timer);
          reject(e);
        }
      );
    });
  }

  // -------------------------------------------------------------------- PDF

  /** Genera y descarga el PDF. Resuelve cuando pdfmake entregó el archivo. */
  toPdf(report: HqsAwardReport, filters: string): Promise<void> {
    return this.withTimeout(
      new Promise<void>((resolve, reject) => {
        // Se difiere un ciclo: pdfmake bloquea el hilo y la UI debe pintar antes el botón bloqueado.
        setTimeout(() => {
          try {
            pdfMake
              .createPdf(this.pdfDefinition(report, filters))
              .download(this.fileName(report, 'pdf'), () => resolve());
          } catch (e) {
            reject(e);
          }
        }, 50);
      })
    );
  }

  private pdfDefinition(report: HqsAwardReport, filters: string): any {
    const c = report.counts;
    const content: any[] = [
      { image: IMAGE, width: 90, absolutePosition: { x: 30, y: 15 } },
      {
        text: 'Reporte de premios Escuela HQS',
        color: TITLE,
        alignment: 'center',
        fontSize: 16,
        bold: true,
        // Margen superior para que el logo (absoluto, ~75 pt de alto) no tape la tabla de datos.
        margin: [0, 35, 0, 10],
      },
      {
        table: {
          widths: ['auto', '*', 'auto', 'auto'],
          body: [
            [
              { text: 'Período académico:', bold: true },
              report.schoolYear.name,
              { text: 'Fecha:', bold: true },
              formatDate(new Date(), 'dd/MM/yyyy', 'es-VE'),
            ],
            [{ text: 'Filtros:', bold: true }, { text: filters, colSpan: 3 }, {}, {}],
          ],
        },
        layout: this.tableLayout,
        margin: [0, 15, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: [60, 60, 60, 60, 80],
          body: [
            this.header(['ORO', 'PLATA', 'BRONCE', 'Sin premio', 'Datos incompletos']),
            [c.gold, c.silver, c.bronze, c.none, c.incomplete].map((n) => ({
              text: `${n}`,
              alignment: 'center',
            })),
          ],
        },
        layout: this.tableLayout,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            this.header([
              'Escuela',
              'Coord.',
              'IAA',
              'PPM',
              'M2M',
              '60LM',
              'Índice\nIntegral',
              'Índice\nDocentes HQS',
              'Promedio',
              'Premio',
            ]),
            ...report.schools.map((s) => [
              s.name,
              s.coordinator || '—',
              { text: this.num(s.components.iaa), alignment: 'center' },
              { text: this.num(s.components.wordsPerMin), alignment: 'center' },
              { text: this.num(s.components.multiplicationsPerMin), alignment: 'center' },
              { text: this.num(s.components.operationsPerMin), alignment: 'center' },
              { text: this.num(s.integralIndex), alignment: 'center' },
              { text: this.num(s.teacherIndex), alignment: 'center' },
              { text: this.num(s.finalIndex), alignment: 'center', bold: true },
              s.status === 'incomplete'
                ? {
                    text: [
                      { text: s.awardLabel, bold: true },
                      { text: `\nfalta: ${s.missingLabels.join(', ')}`, bold: false, fontSize: 7 },
                    ],
                    alignment: 'center',
                    fillColor: this.awardColor(s),
                  }
                : { text: s.awardLabel, alignment: 'center', bold: true, fillColor: this.awardColor(s) },
            ]),
          ],
        },
        layout: this.tableLayout,
      },
      { text: NOTE, fontSize: 7, italics: true, margin: [0, 8, 0, 0] },
    ];

    return {
      info: {
        title: 'Reporte de premios Escuela HQS',
        author: 'Fundación AmbLeMa',
        subject: 'Premios Escuela HQS',
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [25, 30, 25, 30],
      content,
      defaultStyle: { fontSize: 8 },
      footer: (current: number, total: number) => ({
        text: `${current} / ${total}`,
        alignment: 'right',
        fontSize: 7,
        margin: [0, 5, 25, 0],
      }),
    };
  }

  // ------------------------------------------------------------------ Excel

  /** Genera y descarga el Excel; se difiere un ciclo para que la UI muestre el bloqueo antes del trabajo pesado. */
  toExcel(report: HqsAwardReport, filters: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          this.buildExcel(report, filters);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 50);
    });
  }

  private buildExcel(report: HqsAwardReport, filters: string): void {
    const workbook = XLSX.utils.book_new();
    const intro: any[][] = [
      ['Reporte de premios Escuela HQS'],
      ['Período académico', report.schoolYear.name],
      ['Filtros', filters],
      [],
    ];
    const rows: any[][] = [
      ...intro,
      [
        'Escuela',
        'Coordinador',
        'IAA',
        'IAA (puntos /35)',
        'PPM',
        'M2M',
        '60LM',
        'Índice Integral',
        'Índice Docentes HQS',
        'Promedio',
        'Premio',
        'Falta',
      ],
      ...report.schools.map((s) => [
        s.name,
        s.coordinator || '',
        s.components.iaa,
        s.iaaRaw,
        s.components.wordsPerMin,
        s.components.multiplicationsPerMin,
        s.components.operationsPerMin,
        s.integralIndex,
        s.teacherIndex,
        s.finalIndex,
        s.awardLabel,
        s.missingLabels.join(', '),
      ]),
    ];
    this.appendSheet(workbook, 'Premios', rows, intro.length);

    const output = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    saveAs(new Blob([output], { type: 'application/octet-stream' }), this.fileName(report, 'xlsx'));
  }

  private appendSheet(workbook: any, name: string, rows: any[][], headerRow: number): void {
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    const range = XLSX.utils.decode_range(sheet['!ref']);
    // Sin forzar Arial: con Arial + negrita, LibreOffice muestra el texto en blanco/invisible.
    // Colores en ARGB (8 dígitos).
    const border = { style: 'thin', color: { rgb: 'FFCCCCCC' } };

    const title = sheet[XLSX.utils.encode_cell({ r: 0, c: 0 })];
    if (title) {
      title.s = { font: { sz: 14, bold: true } };
    }
    for (let r = 1; r < headerRow - 1; r++) {
      const label = sheet[XLSX.utils.encode_cell({ r, c: 0 })];
      if (label) {
        label.s = { font: { bold: true } };
      }
    }
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: headerRow, c })];
      if (cell) {
        cell.s = {
          // Verde claro con letra negra: si el programa ignora el relleno (p. ej. OpenOffice con
          // xlsx-js-style, que escribe un <bgColor/> vacío) el texto sigue legible sobre blanco.
          font: { bold: true, color: { rgb: 'FF000000' } },
          fill: { patternType: 'solid', fgColor: { rgb: 'FFDDEBC4' } },
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          border: { top: border, bottom: border, left: border, right: border },
        };
      }
    }
    sheet['!cols'] = Array.from({ length: range.e.c + 1 }, (_, c) => ({
      wch: c < 2 ? 30 : c === range.e.c ? 36 : 16,
    }));
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  }
}
