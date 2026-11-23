/** Tipos de ficha (/vademecum/admin/sheet-types, API-12). */

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
}

/** Payload de POST/PUT /vademecum/admin/sheet-types. */
export interface SheetTypeInput {
  name: string;
  headerName: string;
  codePrefix: string;
  color: string;
  sectionTitle: string | null;
  sectionText: string | null;
  sort: number;
  status: string;
}
