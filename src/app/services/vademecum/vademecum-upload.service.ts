import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UploadDetail,
  UploadList,
  UploadStatus,
  UploadSummary,
} from 'src/app/_models/vademecum/upload.model';

/** Cargas de compendios: /vademecum/admin/uploads (API-07 a API-11). */
@Injectable({
  providedIn: 'root',
})
export class VademecumUploadService {
  private readonly url = `${environment.api}vademecum/admin/uploads`;

  constructor(private http: HttpClient) {}

  list(page = 1, pageSize = 20, status?: UploadStatus): Observable<UploadList> {
    let params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<UploadList>(this.url, { params });
  }

  get(id: string): Observable<UploadDetail> {
    return this.http.get<UploadDetail>(`${this.url}/${id}`);
  }

  /** Sube el compendio (BO-02); emite los eventos para mostrar el avance de la subida. */
  create(file: File, sheetTypeId: string, seriesId?: string): Observable<HttpEvent<UploadSummary>> {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('sheetTypeId', sheetTypeId);
    if (seriesId) {
      form.append('seriesId', seriesId);
    }
    return this.http.post<UploadSummary>(this.url, form, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
