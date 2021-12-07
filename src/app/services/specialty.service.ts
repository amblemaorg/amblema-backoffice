import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Specialty, SpecialtyList } from "../_models/specialty.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpecialtyService {
  constructor(private httpClient: HttpClient) {}

  getSpecialty(): Observable<SpecialtyList> {
    return this.httpClient
      .get<SpecialtyList>(`${environment.api}` + "specialty")
      .pipe(map((data: any) => data));
  }

  updateSpecialty(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.api}` + "specialty/" + id,
      data
    );
  }
  saveSpecialty(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}` + "specialty", data);
  }
  deleteSpecialty(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}` + "specialty/" + id
    );
  }
}
