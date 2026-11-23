import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminRating, AdminRatingList, RatingFilters } from 'src/app/_models/vademecum/moderation.model';

/** Moderación de comentarios de fichas (API-16). */
@Injectable({
  providedIn: 'root',
})
export class VademecumModerationService {
  private readonly url = `${environment.api}vademecum/admin/ratings`;

  constructor(private http: HttpClient) {}

  list(filters: RatingFilters, page: number, pageSize = 20): Observable<AdminRatingList> {
    let params = new HttpParams()
      .set('commentStatus', filters.commentStatus)
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    if (filters.sheetId) {
      params = params.set('sheetId', filters.sheetId);
    }
    return this.http.get<AdminRatingList>(this.url, { params });
  }

  /** `updatedAt` es el del registro listado: la API responde 409 si el docente lo editó después. */
  approve(id: string, updatedAt: string): Observable<AdminRating> {
    return this.http.post<AdminRating>(`${this.url}/${id}/approve`, { updatedAt });
  }

  hide(id: string, updatedAt: string): Observable<AdminRating> {
    return this.http.post<AdminRating>(`${this.url}/${id}/hide`, { updatedAt });
  }
}
