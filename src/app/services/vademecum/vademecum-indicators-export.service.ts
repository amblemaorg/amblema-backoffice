import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { IndicatorTeacherExport } from 'src/app/_models/vademecum/indicators.model';

const SHEET_NAME = 'Docentes';
const DATE_FORMAT = 'dd/MM/yyyy HH:mm';
const HEADERS = ['Docente', 'Correo', 'Origen', 'Escuelas', 'Códigos', 'Estados', 'Descargas', 'Última descarga'];
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** Excel y PDF del listado de docentes de Indicadores (BO-11). Los datos planos vienen de API-18. */
@Injectable({
  providedIn: 'root',
})
export class VademecumIndicatorsExportService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  /** `filtersLabel`: texto de los filtros activos, solo para el encabezado del archivo. */
  toExcel(data: IndicatorTeacherExport, filtersLabel: string): void {
    const rows = this.rows(data);
    const matrix = [
      ['Vademécum AmbLeMa · Indicadores de docentes'],
      [this.subtitle(data, filtersLabel)],
      [],
      HEADERS,
      ...rows,
    ];
    const sheet = XLSX.utils.aoa_to_sheet(matrix);
    sheet['!cols'] = [{ wch: 30 }, { wch: 32 }, { wch: 11 }, { wch: 40 }, { wch: 16 }, { wch: 22 }, { wch: 11 }, { wch: 17 }];
    const workbook = XLSX.utils.book_new();
    workbook.Props = { Title: 'Indicadores de docentes de Vademécum', Author: 'AmbLeMa' };
    XLSX.utils.book_append_sheet(workbook, sheet, SHEET_NAME);
    const bytes = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    saveAs(new Blob([bytes], { type: XLSX_MIME }), `${this.fileName(data)}.xlsx`);
  }

  toPdf(data: IndicatorTeacherExport, filtersLabel: string): void {
    // Carga diferida: pdfmake pesa y solo se usa al exportar.
    const pdfMake = require('pdfmake/build/pdfmake.js');
    const pdfFonts = require('pdfmake/build/vfs_fonts.js');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const body = [
      HEADERS.map((title) => ({ text: title, style: 'tableHeader' })),
      ...this.rows(data).map((row) => row.map((cell) => ({ text: String(cell) }))),
    ];
    const definition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [28, 32, 28, 40],
      info: { title: 'Indicadores de docentes de Vademécum', author: 'AmbLeMa' },
      content: [
        { text: 'Vademécum AmbLeMa · Indicadores de docentes', style: 'title' },
        { text: this.subtitle(data, filtersLabel), style: 'subtitle' },
        {
          table: {
            headerRows: 1,
            widths: [95, 105, 40, '*', 50, 65, 42, 62],
            body,
          },
          layout: 'lightHorizontalLines',
        },
      ],
      footer: (current: number, total: number) => ({
        text: `Página ${current} de ${total}`,
        alignment: 'right',
        margin: [28, 12, 28, 0],
        fontSize: 8,
      }),
      defaultStyle: { fontSize: 8 },
      styles: {
        title: { fontSize: 14, bold: true, margin: [0, 0, 0, 4] },
        subtitle: { fontSize: 9, color: '#555555', margin: [0, 0, 0, 10] },
        tableHeader: { bold: true, fillColor: '#eeeeee' },
      },
    };
    pdfMake.createPdf(definition).download(`${this.fileName(data)}.pdf`);
  }

  private rows(data: IndicatorTeacherExport): (string | number)[][] {
    return data.records.map((record) => [
      `${record.lastName || ''} ${record.firstName || ''}`.trim(),
      record.email || '',
      record.originLabel || '',
      record.schools || '',
      record.schoolCodes || '',
      record.states || '',
      record.downloads,
      this.date(record.lastDownloadAt),
    ]);
  }

  private subtitle(data: IndicatorTeacherExport, filtersLabel: string): string {
    const year = data.schoolYear ? `Año escolar ${data.schoolYear.name}` : 'Todos los años';
    const filters = filtersLabel ? ` · ${filtersLabel}` : '';
    return `${year}${filters} · ${data.total} docentes · Generado ${this.date(data.generatedAt)}`;
  }

  private fileName(data: IndicatorTeacherExport): string {
    const year = data.schoolYear ? data.schoolYear.name.replace(/\s+/g, '') : 'todos';
    return `Vademecum-docentes-${year}-${formatDate(new Date(), 'yyyyMMdd-HHmm', this.locale)}`;
  }

  private date(value: string | null): string {
    return value ? formatDate(value, DATE_FORMAT, this.locale) : '';
  }
}
