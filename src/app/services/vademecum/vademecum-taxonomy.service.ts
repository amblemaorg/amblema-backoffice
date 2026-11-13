import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SheetType } from 'src/app/_models/vademecum/sheet-type.model';
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
}
