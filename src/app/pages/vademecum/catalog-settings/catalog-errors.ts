import { HttpErrorResponse } from '@angular/common/http';

export const HAS_SHEETS_CODE = '119';

const FIELD_LABELS: { [field: string]: string } = {
  name: 'Nombre',
  headerName: 'Texto de encabezado',
  codePrefix: 'Prefijo',
  color: 'Color',
  sectionTitle: 'Título de sección',
  sectionText: 'Texto de sección',
  sort: 'Orden',
  status: 'Estatus',
  sheetTypeIds: 'Tipos de ficha',
  title: 'Título',
  body: 'Texto',
  general: 'General',
};

interface ApiIssue {
  status: string;
  msg: string;
}

/** Errores de la API: {"<campo>": [{"status": "<código>", "msg": "..."}]}. */
function issues(err: HttpErrorResponse): { field: string; issue: ApiIssue }[] {
  const body: unknown = err && err.error;
  if (!body || typeof body !== 'object') {
    return [];
  }
  const result: { field: string; issue: ApiIssue }[] = [];
  Object.keys(body as Record<string, unknown>).forEach((field) => {
    const items = (body as Record<string, unknown>)[field];
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item && typeof item === 'object') {
          const raw = item as { status?: unknown; msg?: unknown };
          result.push({ field, issue: { status: String(raw.status), msg: String(raw.msg || '') } });
        }
      });
    }
  });
  return result;
}

export function hasErrorCode(err: HttpErrorResponse, code: string): boolean {
  return issues(err).some((entry) => entry.issue.status === code);
}

/** Mensaje en español para el aviso; `duplicatedText` aplica al código "1" con "Duplicated". */
export function apiErrorMessage(err: HttpErrorResponse, fallback: string, duplicatedText?: string): string {
  if (err && err.status === 0) {
    return 'No hay conexión con el servidor. Intente de nuevo.';
  }
  if (err && err.status === 403) {
    return 'No tiene permisos para realizar esta acción.';
  }
  if (err && err.status === 404) {
    return 'El registro ya no existe. Se actualizó la lista.';
  }
  const found = issues(err);
  if (found.length === 0) {
    return fallback;
  }
  const messages = found.map(({ field, issue }) => {
    if (/duplicated/i.test(issue.msg) && duplicatedText) {
      return duplicatedText;
    }
    const label = FIELD_LABELS[field] || field;
    return `${label}: ${issue.msg || 'valor no válido'}.`;
  });
  return `${fallback} ${messages.join(' ')}`;
}

/** Escapa texto del usuario antes de ponerlo en una celda `type: 'html'`. */
export function esc(value: any): string {
  const map: { [char: string]: string } = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, (char) => map[char]);
}
