import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadDetail, UploadList, UploadStatus } from 'src/app/_models/vademecum/upload.model';

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
}
