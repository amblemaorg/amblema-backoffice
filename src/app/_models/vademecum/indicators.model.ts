/** Indicadores de uso de Vademécum (API-17 y API-18: /vademecum/admin/indicators). */

export type IndicatorOrigin = 'enrollment' | 'external';

export interface IndicatorFilters {
  schoolYearId: string | null;
  stateId: string | null;
  schoolId: string | null;
  sheetTypeId: string | null;
  origin: IndicatorOrigin | null;
}

export interface IndicatorAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IndicatorSchool {
  id: string | null;
  name: string;
  code: string | null;
  stateName: string | null;
}

export interface IndicatorSchoolYear {
  id: string;
  name: string;
}

export interface IndicatorTotals {
  downloads: number;
  activeTeachers: number;
  activeSchools: number;
  externalTeachers: number;
}

export interface IndicatorByType {
  sheetType: { id: string; name: string; codePrefix: string; color: string };
  downloads: number;
}

export interface IndicatorTopSheet {
  sheet: { id: string; code: string; title: string };
  downloads: number;
}

export interface IndicatorTopTeacher {
  account: IndicatorAccount;
  downloads: number;
}

export interface IndicatorTopSchool {
  school: IndicatorSchool;
  downloads: number;
  activeTeachers: number;
}

export interface IndicatorsSummary {
  schoolYear: IndicatorSchoolYear | null;
  totals: IndicatorTotals;
  byType: IndicatorByType[];
  byOrigin: { enrollment: number; external: number };
  topSheets: IndicatorTopSheet[];
  topTeachers: IndicatorTopTeacher[];
  topSchools: IndicatorTopSchool[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pages: number;
}

export interface IndicatorTeacher {
  account: IndicatorAccount;
  schools: IndicatorSchool[];
  origin: IndicatorOrigin;
  downloads: number;
  lastDownloadAt: string | null;
}

export interface IndicatorTeacherList {
  records: IndicatorTeacher[];
  pagination: Pagination;
}

export interface IndicatorTeacherDownload {
  id: string;
  sheet: { id: string; code: string; title: string; sheetTypeName: string };
  school: IndicatorSchool | null;
  schoolYear: IndicatorSchoolYear;
  origin: IndicatorOrigin;
  isRedownload: boolean;
  createdAt: string;
}

export interface IndicatorTeacherDownloadList {
  records: IndicatorTeacherDownload[];
  pagination: Pagination;
}
