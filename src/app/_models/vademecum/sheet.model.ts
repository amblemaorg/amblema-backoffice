/** Fichas en la administración de Vademécum (/vademecum/admin/sheets, API-12). */

export type SheetStatus = 'draft' | 'published' | 'unpublished';

export interface AdminSheet {
  id: string;
  code: string;
  number: number;
  title: string;
  description: string | null;
  sheetType: { id: string; name: string; codePrefix: string; color: string } | null;
  grades: string[];
  areas: { id: string; name: string }[];
  status: SheetStatus;
  pageCount: number | null;
  sizeBytes: number | null;
  fileStatus: 'ready' | null;
  publishedAt: string | null;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}

export interface AdminSheetList {
  records: AdminSheet[];
  pagination: Pagination;
}

/** Lo que acepta PUT /vademecum/admin/sheets/{id} (SheetInputSchema). */
export interface SheetInput {
  number?: number;
  title?: string;
  description?: string | null;
  grades?: string[];
  areaIds?: string[];
  sheetTypeId?: string;
}

export interface SheetListFilters {
  status: SheetStatus | null;
  sheetTypeId: string | null;
  q: string;
}

/** Errores de la API: {"<campo>": [{"status": "<código>", "msg": "..."}]}. */
export type ApiErrors = { [field: string]: { status: string; msg: string }[] };

export interface PublishManyResult {
  published: string[];
  failed: { sheetId: string; errors: ApiErrors }[];
}

export interface Area {
  id: string;
  name: string;
  sort: number;
  status: string;
  /** Tipos de ficha a los que aplica el área. */
  sheetTypes: { id: string; name: string }[];
}

/** El área sirve para ese tipo de ficha. */
export function areaAppliesTo(area: Area, sheetTypeId: string | null): boolean {
  return !!sheetTypeId && (area.sheetTypes || []).some((type) => type.id === sheetTypeId);
}

/** Grados como en Section.grade, más "Todos" (GES-02). */
export const GRADE_OPTIONS: { value: string; label: string }[] = [
  { value: '0', label: 'Preescolar' },
  { value: '1', label: '1.º' },
  { value: '2', label: '2.º' },
  { value: '3', label: '3.º' },
  { value: '4', label: '4.º' },
  { value: '5', label: '5.º' },
  { value: '6', label: '6.º' },
  { value: 'all', label: 'Todos' },
];

export const SHEET_STATUS_LABELS: { [status in SheetStatus]: { label: string; color: string } } = {
  draft: { label: 'Borrador', color: 'basic' },
  published: { label: 'Publicada', color: 'success' },
  unpublished: { label: 'Despublicada', color: 'warning' },
};
