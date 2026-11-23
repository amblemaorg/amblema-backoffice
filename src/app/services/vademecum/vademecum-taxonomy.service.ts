import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SheetType, SheetTypeInput } from 'src/app/_models/vademecum/sheet-type.model';
import {
  AdminArea,
  AreaInput,
  SiteContent,
  SiteContentInput,
} from 'src/app/_models/vademecum/catalog-settings.model';
import { Area } from 'src/app/_models/vademecum/sheet.model';

/** Tipos de ficha y áreas de Vademécum (API-12). */
@Injectable({
  providedIn: 'root',
})
export class VademecumTaxonomyService {
  private readonly url = `${environment.api}vademecum/admin`;

  constructor(private http: HttpClient) {}

  sheetTypes(): Observable<SheetType[]> {
    return this.http
      .get<{ records: SheetType[] }>(`${this.url}/sheet-types`)
      .pipe(map((response) => response.records));
  }

  areas(): Observable<Area[]> {
    return this.http
      .get<{ records: Area[] }>(`${this.url}/areas`)
      .pipe(map((response) => response.records));
  }

  // --- Administración de tipos, áreas y textos (BO-07) ---

  createSheetType(input: SheetTypeInput): Observable<SheetType> {
    return this.http.post<SheetType>(`${this.url}/sheet-types`, input);
  }

  updateSheetType(id: string, input: SheetTypeInput): Observable<SheetType> {
    return this.http.put<SheetType>(`${this.url}/sheet-types/${id}`, input);
  }

  /** Borrado lógico; con fichas la API responde 409 (código 119). */
  deleteSheetType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/sheet-types/${id}`);
  }

  /** Áreas con `sheetCount` (la misma ruta que `areas()`, con la forma ampliada). */
  adminAreas(): Observable<AdminArea[]> {
    return this.http
      .get<{ records: AdminArea[] }>(`${this.url}/areas`)
      .pipe(map((response) => response.records));
  }

  createArea(input: AreaInput): Observable<AdminArea> {
    return this.http.post<AdminArea>(`${this.url}/areas`, input);
  }

  updateArea(id: string, input: AreaInput): Observable<AdminArea> {
    return this.http.put<AdminArea>(`${this.url}/areas/${id}`, input);
  }

  /** Borrado lógico; la API quita el área de las fichas que la usan. */
  deleteArea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/areas/${id}`);
  }

  siteContents(): Observable<SiteContent[]> {
    return this.http
      .get<{ records: SiteContent[] }>(`${this.url}/site-content`)
      .pipe(map((response) => response.records));
  }

  updateSiteContent(key: string, input: SiteContentInput): Observable<SiteContent> {
    return this.http.put<SiteContent>(`${this.url}/site-content/${encodeURIComponent(key)}`, input);
  }
}
