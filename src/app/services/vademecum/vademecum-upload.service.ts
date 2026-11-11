import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { SKIP_LOADING_HEADER } from 'src/app/_intercepts/loading-interceptor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UploadCut,
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

  /** `silent`: sin pantalla de carga (consulta periódica del avance, BO-03). */
  get(id: string, silent = false): Observable<UploadDetail> {
    const headers = silent ? new HttpHeaders({ [SKIP_LOADING_HEADER]: '1' }) : undefined;
    return this.http.get<UploadDetail>(`${this.url}/${id}`, { headers });
  }

  listSilently(page = 1, pageSize = 20): Observable<UploadList> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    const headers = new HttpHeaders({ [SKIP_LOADING_HEADER]: '1' });
    return this.http.get<UploadList>(this.url, { params, headers });
  }

  /** Miniatura de una página (requiere token): se pide como blob y en silencio. */
  pageThumbnail(path: string): Observable<Blob> {
    const headers = new HttpHeaders({ [SKIP_LOADING_HEADER]: '1' });
    return this.http.get(`${environment.api}${path.replace(/^\//, '')}`, {
      headers,
      responseType: 'blob',
    });
  }

  /** Guarda los cortes confirmados (API-11; solo en `review`). */
  saveCuts(id: string, cuts: UploadCut[]): Observable<UploadDetail> {
    return this.http.put<UploadDetail>(`${this.url}/${id}/cuts`, { cuts });
  }

  /** Genera las fichas en borrador a partir de los cortes confirmados (API-11). */
  generate(id: string): Observable<UploadSummary> {
    return this.http.post<UploadSummary>(`${this.url}/${id}/generate`, {});
  }

  /** Vuelve a leer el compendio original (en `review` o `error`). */
  reprocess(id: string): Observable<UploadSummary> {
    return this.http.post<UploadSummary>(`${this.url}/${id}/reprocess`, {});
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
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
