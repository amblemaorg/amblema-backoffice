/** Cargas de compendios de Vademécum (GES-03 5.5, /vademecum/admin/uploads). */

export type UploadStatus =
  | 'uploaded'
  | 'processing'
  | 'review'
  | 'generating'
  | 'done'
  | 'error';

export interface UploadSheetType {
  id: string;
  name: string;
  codePrefix: string;
  color: string;
}

export interface UploadSeries {
  id: string;
  name: string;
  code: string;
}

export interface UploadSummary {
  id: string;
  originalFileName: string;
  originalSizeBytes: number;
  pageCount: number | null;
  sheetType: UploadSheetType | null;
  series: UploadSeries | null;
  status: UploadStatus;
  progress: number;
  errorMessage: string | null;
  sheetCount: number;
  createdBy: { id: string; name: string } | null;
  createdAt: string;
  processedAt: string | null;
}

export interface UploadPage {
  index: number;
  headerText: string | null;
  number: number | null;
  isContinuation: boolean;
  title: string | null;
  thumbnailUrl: string | null;
}

export interface UploadCut {
  pages: number[];
  number: number | null;
  title: string | null;
  excluded: boolean;
}

export interface UploadDetail extends UploadSummary {
  pages: UploadPage[];
  proposedCuts: UploadCut[];
  confirmedCuts: UploadCut[];
  sheets: { id: string; code: string; title: string }[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}

export interface UploadList {
  records: UploadSummary[];
  pagination: Pagination;
}

/** Texto y color (Nebular) de cada estado para el backoffice. */
export const UPLOAD_STATUS_LABELS: { [status in UploadStatus]: { label: string; color: string } } = {
  uploaded: { label: 'En cola', color: 'basic' },
  processing: { label: 'Procesando', color: 'info' },
  review: { label: 'Por revisar', color: 'warning' },
  generating: { label: 'Generando fichas', color: 'info' },
  done: { label: 'Fichas generadas', color: 'success' },
  error: { label: 'Error', color: 'danger' },
};

/** Estados en los que la API está trabajando: el backoffice consulta el avance. */
export const UPLOAD_BUSY_STATUSES: UploadStatus[] = ['uploaded', 'processing', 'generating'];
