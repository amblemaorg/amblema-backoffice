import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AccessRequest,
  AccessRequestFilters,
  AccessRequestList,
  Authorization,
  AuthorizationList,
} from 'src/app/_models/vademecum/access-request.model';

/** Solicitudes de acceso y autorizaciones de Vademécum (API-05). */
@Injectable({
  providedIn: 'root',
})
export class VademecumAccessService {
  private readonly url = `${environment.api}vademecum/admin`;

  constructor(private http: HttpClient) {}

  requests(filters: AccessRequestFilters, page: number, pageSize = 20): Observable<AccessRequestList> {
    let params = new HttpParams()
      .set('status', filters.status)
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    if (filters.schoolYearId) {
      params = params.set('schoolYearId', filters.schoolYearId);
    }
    if (filters.q.trim()) {
      params = params.set('q', filters.q.trim());
    }
    return this.http.get<AccessRequestList>(`${this.url}/access-requests`, { params });
  }

  approve(id: string): Observable<AccessRequest> {
    return this.http.post<AccessRequest>(`${this.url}/access-requests/${id}/approve`, {});
  }

  reject(id: string, reason: string): Observable<AccessRequest> {
    return this.http.post<AccessRequest>(`${this.url}/access-requests/${id}/reject`, { reason });
  }

  authorizations(schoolYearId: string | null, page: number, pageSize = 10): Observable<AuthorizationList> {
    let params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    if (schoolYearId) {
      params = params.set('schoolYearId', schoolYearId);
    }
    return this.http.get<AuthorizationList>(`${this.url}/authorizations`, { params });
  }

  revoke(id: string): Observable<Authorization> {
    return this.http.post<Authorization>(`${this.url}/authorizations/${id}/revoke`, {});
  }
}
