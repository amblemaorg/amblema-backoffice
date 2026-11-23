/** Áreas y textos del sitio en la administración (/vademecum/admin/areas y /site-content, API-12). */

export interface AdminArea {
  id: string;
  name: string;
  sort: number;
  status: string;
  sheetCount: number;
  /** Tipos de ficha a los que aplica el área (una ficha solo acepta áreas de su tipo, 121). */
  sheetTypes: { id: string; name: string }[];
}

export interface AreaInput {
  name: string;
  sort: number;
  status: string;
  sheetTypeIds: string[];
}

export interface SiteContent {
  key: string;
  title: string | null;
  body: string | null;
  updatedAt: string | null;
}

export interface SiteContentInput {
  title: string | null;
  body: string | null;
}

export const ACTIVE_STATUS = '1';
export const INACTIVE_STATUS = '2';
