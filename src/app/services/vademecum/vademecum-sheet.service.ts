import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AdminSheet,
  AdminSheetList,
  PublishManyResult,
  SheetInput,
  SheetListFilters,
} from 'src/app/_models/vademecum/sheet.model';

/** Fichas de Vademécum en la administración (API-12). */
@Injectable({
  providedIn: 'root',
})
export class VademecumSheetService {
  private readonly url = `${environment.api}vademecum/admin/sheets`;

  constructor(private http: HttpClient) {}

  /** Fichas de un tipo (para avisar números repetidos antes de subir). */
  listByType(sheetTypeId: string, page = 1): Observable<AdminSheetList> {
    const params = new HttpParams()
      .set('sheetTypeId', sheetTypeId)
      .set('page', String(page))
      .set('pageSize', '100');
    return this.http.get<AdminSheetList>(this.url, { params });
  }

  /**
   * Crea la ficha con el PDF que separó el navegador (POST /vademecum/admin/sheets).
   * `publish`: la publica al crearla; la API exige descripción y grados (113).
   */
  create(pdf: Blob, fileName: string, data: SheetInput, publish: boolean): Observable<AdminSheet> {
    const form = new FormData();
    form.append('file', pdf, fileName);
    form.append('data', JSON.stringify(data));
    form.append('publish', publish ? 'true' : 'false');
    return this.http.post<AdminSheet>(this.url, form);
  }

  /** Listado con filtros (todos los estados si `status` va vacío). */
  list(filters: SheetListFilters, page = 1, pageSize = 20): Observable<AdminSheetList> {
    let params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.sheetTypeId) {
      params = params.set('sheetTypeId', filters.sheetTypeId);
    }
    const q = (filters.q || '').trim();
    if (q) {
      params = params.set('q', q);
    }
    return this.http.get<AdminSheetList>(this.url, { params });
  }

  unpublish(id: string): Observable<AdminSheet> {
    return this.http.post<AdminSheet>(`${this.url}/${id}/unpublish`, {});
  }

  /** Borrado lógico: las descargas registradas se conservan. */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  update(id: string, data: SheetInput): Observable<AdminSheet> {
    return this.http.put<AdminSheet>(`${this.url}/${id}`, data);
  }

  publish(id: string): Observable<AdminSheet> {
    return this.http.post<AdminSheet>(`${this.url}/${id}/publish`, {});
  }

  publishMany(sheetIds: string[]): Observable<PublishManyResult> {
    return this.http.post<PublishManyResult>(
      `${this.url}/publish`,
      { sheetIds },
    );
  }

  /** PDF para revisar (no registra descarga); se pide con token como blob. */
  file(id: string): Observable<Blob> {
    return this.http.get(`${this.url}/${id}/file`, { responseType: 'blob' });
  }
}
