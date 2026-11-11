import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminSheet, AdminSheetList, SheetInput } from 'src/app/_models/vademecum/sheet.model';

/** Fichas de Vademécum en la administración (API-12). */
@Injectable({
  providedIn: 'root',
})
export class VademecumSheetService {
  private readonly url = `${environment.api}vademecum/admin/sheets`;

  constructor(private http: HttpClient) {}

  listByUpload(uploadId: string): Observable<AdminSheetList> {
    const params = new HttpParams().set('uploadId', uploadId).set('pageSize', '100');
    return this.http.get<AdminSheetList>(this.url, { params });
  }

  update(id: string, data: SheetInput): Observable<AdminSheet> {
    return this.http.put<AdminSheet>(`${this.url}/${id}`, data);
  }

  publish(id: string): Observable<AdminSheet> {
    return this.http.post<AdminSheet>(`${this.url}/${id}/publish`, {});
  }

  publishMany(sheetIds: string[]): Observable<{ published: string[]; failed: { sheetId: string; errors: any }[] }> {
    return this.http.post<{ published: string[]; failed: { sheetId: string; errors: any }[] }>(
      `${this.url}/publish`,
      { sheetIds },
    );
  }

  /** PDF para revisar (no registra descarga); se pide con token como blob. */
  file(id: string): Observable<Blob> {
    return this.http.get(`${this.url}/${id}/file`, { responseType: 'blob' });
  }
}
