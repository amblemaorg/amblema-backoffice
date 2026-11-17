/** Tipos de ficha y sus series (/vademecum/admin/sheet-types, API-12). */

export interface SheetSeries {
  id: string;
  name: string;
  code: string;
  grades: string[];
  sort: number;
}

export interface SheetType {
  id: string;
  name: string;
  headerName: string;
  codePrefix: string;
  color: string;
  sectionTitle: string | null;
  sectionText: string | null;
  sort: number;
  status: string;
  sheetCount: number;
  series: SheetSeries[];
}

/** Serie dentro del payload de alta/edición de un tipo (sin `id` = serie nueva). */
export interface SheetSeriesInput {
  id?: string;
  name: string;
  code: string;
  grades: string[];
  sort: number;
}

/** Payload de POST/PUT /vademecum/admin/sheet-types: siempre la lista completa de series. */
export interface SheetTypeInput {
  name: string;
  headerName: string;
  codePrefix: string;
  color: string;
  sectionTitle: string | null;
  sectionText: string | null;
  sort: number;
  status: string;
  series: SheetSeriesInput[];
}
