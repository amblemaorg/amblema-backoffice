import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx-js-style';

import { IMAGE } from '../img-base-64';
import {
  CoevaluationReport,
  CoevaluationExportScope,
  CoevaluationLevelTeacherRow,
  CoevaluationSchoolSummary,
} from 'src/app/_models/report/coevaluation-report.model';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GREEN = '#81b03e';
const PDF_FONT_SIZE = 8; // defaultStyle.fontSize del PDF
const LINE_HEIGHT_FACTOR = 1.17; // Roboto
const SUBTITLE_SIZE = 11; // subtítulos (escuela, nivel): entre el texto (8) y los títulos de sección (14)
const TITLE = '#2e8aaa';

const NO_STATE = 'Sin estado';
const STATE_BAND = '#0b4a5e'; // azul oscuro del título de cada estado
const NO_LEVEL = 'none'; // escuela sin índice (ninguna coevaluación completa)
const REPORT_TITLES: { [key in CoevaluationExportScope]: string } = {
  filters: 'Reporte de coevaluación docentes HQS',
  general: 'Reporte general de coevaluación docentes HQS',
  byState: 'Reporte de coevaluación docentes HQS por estado',
};
const FILE_PREFIXES: { [key in CoevaluationExportScope]: string } = {
  filters: 'Reporte-coevaluacion',
  general: 'Reporte-general-coevaluacion',
  byState: 'Reporte-coevaluacion-por-estado',
};

interface StateGroup {
  name: string;
  schools: CoevaluationSchoolSummary[];
  nTeachers: number;
  nCompleted: number;
  // Escuelas por nivel de su índice (más "none" para las que no tienen índice)
  schoolLevels: { [code: string]: number };
}

@Injectable()
export class CoevaluationReportExport {
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

  private fullName(row: CoevaluationLevelTeacherRow): string {
    return `${row.firstName || ''} ${row.lastName || ''}`.trim();
  }

  private card(row: CoevaluationLevelTeacherRow): string {
    if (!row.cardId) {
      return '';
    }
    return `${row.cardType === '2' ? 'E' : 'V'}-${row.cardId}`;
  }

  private flatten<T>(arrays: T[][]): T[] {
    return arrays.reduce((acc, list) => acc.concat(list), [] as T[]);
  }

  /**
   * Título de un estado: franja oscura con letra blanca, como primera fila de la tabla de ese estado.
   * Al ser fila de cabecera (headerRows: 2) se repite en cada hoja si la tabla continúa.
   */
  private stateBand(text: string, columns: number): any[] {
    const band = {
      text,
      colSpan: columns,
      bold: true,
      fontSize: 12,
      color: '#FFF',
      fillColor: STATE_BAND,
      margin: [4, 3, 0, 3],
    };
    return [band, ...Array.from({ length: columns - 1 }, () => ({}))];
  }

  /** Escuelas agrupadas por estado (orden alfabético; "Sin estado" al final) con sus totales. */
  private groupByState(report: CoevaluationReport): StateGroup[] {
    const groups: { [name: string]: StateGroup } = {};
    report.bySchool.forEach((school) => {
      const name = school.state ? school.state.name : NO_STATE;
      if (!groups[name]) {
        const schoolLevels: { [code: string]: number } = { [NO_LEVEL]: 0 };
        report.instrument.levels.forEach((l) => (schoolLevels[l.code] = 0));
        groups[name] = { name, schools: [], nTeachers: 0, nCompleted: 0, schoolLevels };
      }
      const group = groups[name];
      group.schools.push(school);
      group.nTeachers += school.nTeachers;
      group.nCompleted += school.nCompleted;
      group.schoolLevels[school.indexLevel ? school.indexLevel : NO_LEVEL] += 1;
    });
    return Object.keys(groups)
      .map((name) => groups[name])
      .sort((a, b) => {
        if (a.name === NO_STATE || b.name === NO_STATE) {
          return a.name === NO_STATE ? 1 : -1;
        }
        return a.name.localeCompare(b.name, 'es');
      });
  }

  /** "Docente HQS con Excelencia" -> "con Excelencia"; "Docente en Fase Inicial (...)" -> "en Fase Inicial" */
  private shortLevel(label: string): string {
    return label
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/^Docente(?:\s+HQS)?\s+/i, '')
      .trim();
  }

  private fileName(report: CoevaluationReport, ext: string, scope: CoevaluationExportScope = 'filters'): string {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const now = new Date();
    const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(
      now.getHours()
    )}-${pad(now.getMinutes())}`;
    const year = (report.schoolYear.name || '').replace(/[^0-9A-Za-z-]+/g, '');
    return `${FILE_PREFIXES[scope]}-${year}_${date}.${ext}`;
  }

  /**
   * Cabecera con el texto centrado también en vertical. pdfmake 0.2 no tiene alineación
   * vertical en celdas: se compensa con margen arriba y abajo según los saltos de línea
   * (\n) de cada título frente al título más alto de la fila. Por eso los títulos largos
   * llevan el salto explícito y no dependen del ajuste automático de pdfmake.
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

  // -------------------------------------------------------------------- PDF

  /**
   * Genera y descarga el PDF. Resuelve cuando pdfmake terminó de generar y entregar el archivo,
   * para que el botón quede bloqueado durante todo el proceso.
   */
  toPdf(
    report: CoevaluationReport,
    filters: string,
    scope: CoevaluationExportScope = 'filters'
  ): Promise<void> {
    return this.withTimeout(
      new Promise<void>((resolve, reject) => {
        // Se difiere un ciclo: pdfmake bloquea el hilo y la UI debe pintar antes el botón bloqueado.
        setTimeout(() => {
          try {
            pdfMake
              .createPdf(this.pdfDefinition(report, filters, scope))
              .download(this.fileName(report, 'pdf', scope), () => resolve());
          } catch (e) {
            reject(e);
          }
        }, 50);
      })
    );
  }

  private pdfDefinition(report: CoevaluationReport, filters: string, scope: CoevaluationExportScope): any {
    const content: any[] = [
      { image: IMAGE, width: 90, absolutePosition: { x: 30, y: 15 } },
      {
        text: REPORT_TITLES[scope],
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
        margin: [0, 15, 0, 15],
      },
    ];

    content.push(...(scope === 'byState' ? this.pdfStateSections(report) : this.pdfSections(report)));

    return {
      info: {
        title: REPORT_TITLES[scope],
        author: 'Fundación AmbLeMa',
        subject: 'Coevaluación docentes HQS',
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

  /** Secciones del reporte por escuela (también el general): resumen, docentes por nivel y detalle. */
  private pdfSections(report: CoevaluationReport): any[] {
    const content: any[] = [];
    content.push(this.sectionTitle('Resumen por escuela'));
    content.push(this.pdfSummary(report));

    content.push(this.sectionTitle('Docentes por nivel', true));
    report.byLevel.forEach((group) => {
      content.push({
        text: `${group.label} (${group.count})`,
        bold: true,
        fontSize: SUBTITLE_SIZE,
        color: STATE_BAND,
        margin: [0, 12, 0, 5],
      });
      if (!group.count) {
        content.push({ text: 'Sin docentes en este nivel.', italics: true, fontSize: 9 });
        return;
      }
      content.push({
        table: {
          headerRows: 1,
          widths: ['*', 'auto', '*', 'auto', 'auto', '*', 'auto', 'auto'],
          body: [
            this.header(['Docente', 'Cédula', 'Correo', 'Teléfono', 'Grado /\nSección', 'Escuela', 'Puntaje', '%']),
            ...group.teachers.map((row) => [
              this.fullName(row),
              this.card(row),
              row.email || '',
              row.phone || '',
              row.sections || '',
              row.school ? row.school.name : '',
              { text: this.num(row.totalScore), alignment: 'center' },
              { text: this.num(row.percentage), alignment: 'center' },
            ]),
          ],
        },
        layout: this.tableLayout,
      });
    });

    content.push(this.sectionTitle('Detalle por escuela (promedio acordado por ítem)', true));
    report.bySchool.forEach((school) => content.push(...this.pdfSchoolDetail(school)));
    return content;
  }

  /** Por estado: resumen de escuelas por nivel en cada estado y, luego, las escuelas de cada estado con su nivel. */
  private pdfStateSections(report: CoevaluationReport): any[] {
    const groups = this.groupByState(report);
    const levels = report.instrument.levels;
    const center = (n: number, bold: boolean = false) => ({ text: `${n}`, alignment: 'center', bold });
    const sum = (pick: (g: StateGroup) => number) => groups.reduce((acc, g) => acc + pick(g), 0);
    const content: any[] = [
      this.sectionTitle('Resumen por estado'),
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', ...levels.map(() => 'auto'), 'auto'],
          body: [
            this.header([
              'Estado',
              'Escuelas',
              'Docentes',
              'Completadas',
              ...levels.map((l) => this.shortLevel(l.label).replace(' ', '\n')),
              'Sin\níndice',
            ]),
            ...groups.map((g) => [
              g.name,
              center(g.schools.length, true),
              center(g.nTeachers),
              center(g.nCompleted),
              ...levels.map((l) => center(g.schoolLevels[l.code])),
              center(g.schoolLevels[NO_LEVEL]),
            ]),
            [
              { text: 'Total', bold: true },
              center(sum((g) => g.schools.length), true),
              center(sum((g) => g.nTeachers), true),
              center(sum((g) => g.nCompleted), true),
              ...levels.map((l) => center(sum((g) => g.schoolLevels[l.code]), true)),
              center(sum((g) => g.schoolLevels[NO_LEVEL]), true),
            ],
          ],
        },
        layout: this.tableLayout,
      },
      { text: 'Las columnas de nivel cuentan escuelas según el nivel de su índice.', fontSize: 8, italics: true, margin: [0, 4, 0, 0] },
    ];
    groups.forEach((g) => {
      content.push({
        table: {
          headerRows: 2,
          dontBreakRows: true,
          widths: ['*', 140, 50, 60, 50, 140],
          body: [
            this.stateBand(
              `${g.name} (${g.schools.length} ${g.schools.length === 1 ? 'escuela' : 'escuelas'})`,
              6
            ),
            this.header(['Escuela', 'Coordinador', 'Docentes', 'Completadas', 'Índice %', 'Nivel']),
            ...g.schools.map((s) => [
              s.name,
              s.coordinator || '—',
              center(s.nTeachers),
              center(s.nCompleted),
              { text: this.num(s.index), alignment: 'center', bold: true },
              s.indexLevelLabel || '—',
            ]),
          ],
        },
        layout: this.tableLayout,
        margin: [0, 14, 0, 0],
      });
    });
    return content;
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

  private sectionTitle(text: string, pageBreak: boolean = false): any {
    return {
      text,
      fontSize: 14,
      bold: true,
      color: STATE_BAND,
      margin: [0, 5, 0, 8],
      pageBreak: pageBreak ? 'before' : undefined,
    };
  }

  private pdfSummary(report: CoevaluationReport): any {
    const levels = report.instrument.levels;
    return {
      table: {
        headerRows: 1,
        widths: ['*', '*', 'auto', 'auto', 'auto', 'auto', ...levels.map(() => 'auto')],
        body: [
          this.header([
            'Escuela',
            'Coordinador',
            'Docentes',
            'Completadas',
            'Índice %',
            'Nivel',
            ...levels.map((l) => this.shortLevel(l.label).replace(' ', '\n')),
          ]),
          ...report.bySchool.map((s) => [
            s.name,
            s.coordinator || '',
            { text: `${s.nTeachers}`, alignment: 'center' },
            { text: `${s.nCompleted}`, alignment: 'center' },
            { text: this.num(s.index), alignment: 'center' },
            s.indexLevelLabel || '—',
            ...levels.map((l) => ({ text: `${s.levelCounts[l.code]}`, alignment: 'center' })),
          ]),
        ],
      },
      layout: this.tableLayout,
    };
  }

  private pdfSchoolDetail(school: CoevaluationSchoolSummary): any[] {
    const itemNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
    return [
      {
        text: `${school.name} · Coordinador: ${school.coordinator || '—'} · Índice: ${
          school.index !== null ? this.num(school.index) + ' %' : '—'
        }`,
        bold: true,
        fontSize: SUBTITLE_SIZE,
        color: STATE_BAND,
        margin: [0, 14, 0, 5],
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', ...itemNumbers.map(() => 14), 'auto', 'auto', 'auto'],
          body: [
            this.header(['Docente', 'Estatus', ...itemNumbers.map((n) => `${n}`), 'Total', '%', 'Nivel'], GREEN, 7),
            ...school.teachers.map((row) => [
              `${this.fullName(row)}${row.sections ? '\n' + row.sections : ''}`,
              row.statusLabel,
              ...row.items.map((item) => ({ text: this.num(item.average), alignment: 'center' })),
              { text: this.num(row.totalScore), alignment: 'center' },
              { text: this.num(row.percentage), alignment: 'center' },
              row.levelLabel ? this.shortLevel(row.levelLabel) : '—',
            ]),
          ],
        },
        layout: this.tableLayout,
        fontSize: 7,
      },
    ];
  }

  // ------------------------------------------------------------------ Excel

  /** Genera y descarga el Excel; se difiere un ciclo para que la UI muestre el bloqueo antes del trabajo pesado. */
  toExcel(
    report: CoevaluationReport,
    filters: string,
    scope: CoevaluationExportScope = 'filters'
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          this.buildExcel(report, filters, scope);
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 50);
    });
  }

  private buildExcel(report: CoevaluationReport, filters: string, scope: CoevaluationExportScope): void {
    const workbook = XLSX.utils.book_new();
    const intro: any[][] = [
      [REPORT_TITLES[scope]],
      ['Período académico', report.schoolYear.name],
      ['Filtros', filters],
      [],
    ];

    if (scope === 'byState') {
      this.appendStateSheets(workbook, report, intro);
    } else {
      this.appendSheets(workbook, report, intro);
    }

    const output = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    saveAs(new Blob([output], { type: 'application/octet-stream' }), this.fileName(report, 'xlsx', scope));
  }

  /** Hojas del reporte por escuela (también el general): resumen, docentes por nivel y detalle por ítem. */
  private appendSheets(workbook: any, report: CoevaluationReport, intro: any[][]): void {
    // Hoja 1: resumen por escuela
    const levels = report.instrument.levels;
    const summary: any[][] = [
      ...intro,
      [
        'Escuela',
        'Coordinador',
        'Docentes',
        'Completadas',
        'Índice Docentes HQS (%)',
        'Nivel de la escuela',
        ...levels.map((l) => l.label),
        'Pendiente docente',
        'Pendiente coordinador',
        'Sin iniciar',
      ],
      ...report.bySchool.map((s) => [
        s.name,
        s.coordinator || '',
        s.nTeachers,
        s.nCompleted,
        s.index,
        s.indexLevelLabel || '',
        ...levels.map((l) => s.levelCounts[l.code]),
        s.statusCounts.pending_teacher,
        s.statusCounts.pending_coordinator,
        s.statusCounts.not_started,
      ]),
    ];
    this.appendSheet(workbook, 'Resumen por escuela', summary, intro.length);

    // Hoja 2: docentes agrupados por nivel
    const byLevel: any[][] = [
      ...intro,
      [
        'Nivel',
        'Docente',
        'Cédula',
        'Correo',
        'Teléfono',
        'Grado / Sección',
        'Escuela',
        'Coordinador',
        `Puntaje (${report.instrument.maxTotal})`,
        '%',
      ],
    ];
    report.byLevel.forEach((group) =>
      group.teachers.forEach((row) =>
        byLevel.push([
          group.label,
          this.fullName(row),
          this.card(row),
          row.email || '',
          row.phone || '',
          row.sections || '',
          row.school ? row.school.name : '',
          row.coordinator || '',
          row.totalScore,
          row.percentage,
        ])
      )
    );
    this.appendSheet(workbook, 'Docentes por nivel', byLevel, intro.length);

    // Hoja 3: detalle con los 15 ítems (docente, coordinador y promedio)
    const items = report.instrument.items;
    const detail: any[][] = [
      ...intro,
      [
        'Escuela',
        'Docente',
        'Cédula',
        'Grado / Sección',
        'Estatus',
        `Puntaje (${report.instrument.maxTotal})`,
        '%',
        'Nivel',
        ...this.flatten(
          items.map((item) => [
            `${item.number}. ${item.title} - Docente`,
            `${item.number}. ${item.title} - Coordinador`,
            `${item.number}. ${item.title} - Promedio`,
          ])
        ),
      ],
    ];
    report.bySchool.forEach((school) =>
      school.teachers.forEach((row) =>
        detail.push([
          school.name,
          this.fullName(row),
          this.card(row),
          row.sections || '',
          row.statusLabel,
          row.totalScore,
          row.percentage,
          row.levelLabel || '',
          ...this.flatten(row.items.map((i) => [i.teacher, i.coordinator, i.average])),
        ])
      )
    );
    this.appendSheet(workbook, 'Detalle por ítem', detail, intro.length);
  }

  /** Hojas del reporte por estado: "Resumen" (escuelas por nivel) y "Por estado" (escuela y nivel). */
  private appendStateSheets(workbook: any, report: CoevaluationReport, intro: any[][]): void {
    const groups = this.groupByState(report);
    const levels = report.instrument.levels;
    const sum = (pick: (g: StateGroup) => number) => groups.reduce((acc, g) => acc + pick(g), 0);
    const summary: any[][] = [
      ...intro,
      [
        'Estado',
        'Escuelas',
        'Docentes',
        'Completadas',
        ...levels.map((l) => `Escuelas ${this.shortLevel(l.label)}`),
        'Escuelas sin índice',
      ],
      ...groups.map((g) => [
        g.name,
        g.schools.length,
        g.nTeachers,
        g.nCompleted,
        ...levels.map((l) => g.schoolLevels[l.code]),
        g.schoolLevels[NO_LEVEL],
      ]),
      [
        'Total',
        sum((g) => g.schools.length),
        sum((g) => g.nTeachers),
        sum((g) => g.nCompleted),
        ...levels.map((l) => sum((g) => g.schoolLevels[l.code])),
        sum((g) => g.schoolLevels[NO_LEVEL]),
      ],
    ];
    this.appendSheet(workbook, 'Resumen', summary, intro.length, [
      30, 10, 10, 13, ...levels.map(() => 22), 18,
    ]);

    const rows: any[][] = [
      ...intro,
      [
        'Estado',
        'Escuela',
        'Coordinador',
        'Docentes',
        'Completadas',
        'Índice Docentes HQS (%)',
        'Nivel de la escuela',
        ...levels.map((l) => `Docentes ${this.shortLevel(l.label)}`),
      ],
    ];
    groups.forEach((g) =>
      g.schools.forEach((s) =>
        rows.push([
          g.name,
          s.name,
          s.coordinator || '',
          s.nTeachers,
          s.nCompleted,
          s.index,
          s.indexLevelLabel || '',
          ...levels.map((l) => s.levelCounts[l.code]),
        ])
      )
    );
    this.appendSheet(workbook, 'Por estado', rows, intro.length, [
      24, 36, 28, 10, 13, 20, 28, ...levels.map(() => 22),
    ]);
  }

  private appendSheet(
    workbook: any,
    name: string,
    rows: any[][],
    headerRow: number,
    widths?: number[]
  ): void {
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    const range = XLSX.utils.decode_range(sheet['!ref']);
    // Sin forzar Arial: con Arial + negrita, LibreOffice (y equipos sin Arial Bold) muestra
    // el texto en blanco/invisible. Colores en ARGB (8 dígitos).
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
      wch: widths ? widths[c] : c < 3 ? 30 : 16,
    }));
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  }
}
