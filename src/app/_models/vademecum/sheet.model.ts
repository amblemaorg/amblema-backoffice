/** Fichas en la administración de Vademécum (/vademecum/admin/sheets, API-12). */
import { Pagination } from './upload.model';

export type SheetStatus = 'draft' | 'published' | 'unpublished';

export interface AdminSheet {
  id: string;
  code: string;
  number: number;
  title: string;
  description: string | null;
  sheetType: { id: string; name: string; codePrefix: string; color: string } | null;
  series: { id: string; name: string; code: string } | null;
  grades: string[];
  areas: { id: string; name: string }[];
  status: SheetStatus;
  pageCount: number | null;
  sizeBytes: number | null;
  fileStatus: 'ready' | null;
  uploadId: string | null;
  sourcePages: number[];
  publishedAt: string | null;
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
  seriesId?: string | null;
}

export interface Area {
  id: string;
  name: string;
  sort: number;
  status: string;
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
