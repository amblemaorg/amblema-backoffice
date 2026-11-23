import { Pagination } from 'src/app/_models/vademecum/indicators.model';

/** Solicitudes de acceso y autorizaciones de Vademécum (API-05: /vademecum/admin/access-requests y /authorizations). */

export type AccessRequestStatus = 'pending' | 'approved' | 'rejected';

export interface IdName {
  id: string;
  name: string | null;
}

export interface AccessRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cardId: string | null;
  phone: string | null;
  institution: string;
  schoolYear: IdName | null;
  status: AccessRequestStatus;
  rejectionReason: string | null;
  reviewedBy: IdName | null;
  reviewedAt: string | null;
  createdAt: string;
}

export interface AccessRequestList {
  records: AccessRequest[];
  pagination: Pagination;
}

export interface AccessRequestFilters {
  status: AccessRequestStatus;
  schoolYearId: string | null;
  q: string;
}

export interface AuthorizationAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Authorization {
  id: string;
  account: AuthorizationAccount | null;
  schoolYear: IdName | null;
  accessRequestId: string | null;
  approvedBy: IdName | null;
  approvedAt: string | null;
  revokedAt: string | null;
}

export interface AuthorizationList {
  records: Authorization[];
  pagination: Pagination;
}
