import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IndicatorFilters,
  IndicatorsSummary,
  IndicatorTeacherDownloadList,
  IndicatorTeacherList,
} from 'src/app/_models/vademecum/indicators.model';

/** Indicadores de descargas de Vademécum (API-17 y API-18). */
@Injectable({
  providedIn: 'root',
})
export class VademecumIndicatorsService {
  private readonly url = `${environment.api}vademecum/admin/indicators`;

  constructor(private http: HttpClient) {}

  summary(filters: IndicatorFilters, top = 10): Observable<IndicatorsSummary> {
    const params = this.filterParams(filters).set('top', String(top));
    return this.http.get<IndicatorsSummary>(this.url, { params });
  }

  teachers(filters: IndicatorFilters, q: string, page: number, pageSize = 20): Observable<IndicatorTeacherList> {
    let params = this.filterParams(filters).set('page', String(page)).set('pageSize', String(pageSize));
    if (q.trim()) {
      params = params.set('q', q.trim());
    }
    return this.http.get<IndicatorTeacherList>(`${this.url}/teachers`, { params });
  }

  teacherDownloads(
    accountId: string,
    schoolYearId: string | null,
    page: number,
    pageSize = 10,
  ): Observable<IndicatorTeacherDownloadList> {
    let params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    if (schoolYearId) {
      params = params.set('schoolYearId', schoolYearId);
    }
    return this.http.get<IndicatorTeacherDownloadList>(`${this.url}/teachers/${accountId}/downloads`, { params });
  }

  private filterParams(filters: IndicatorFilters): HttpParams {
    let params = new HttpParams();
    (Object.keys(filters) as (keyof IndicatorFilters)[]).forEach((key) => {
      const value = filters[key];
      if (value) {
        params = params.set(key, value);
      }
    });
    return params;
  }
}
