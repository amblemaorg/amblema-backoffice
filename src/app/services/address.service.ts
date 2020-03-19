import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { State, Municipality } from '../models/address.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly STATE: string = 'states';
  private readonly MUNICIPALITY: string = 'municipalities';

  constructor(private httpClient: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.httpClient.get<State[]>(`${environment.api}${this.STATE}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  /**
   * MUNICIPALITY
   */

  getMunicipalities(): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(`${environment.api}${this.MUNICIPALITY}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  getMunicipalityByState(id: string): Observable<Municipality[]> {
    return this.httpClient.get<Municipality[]>(`${environment.api}${this.MUNICIPALITY}?state=${id}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  deleteMunicipality(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.MUNICIPALITY}/${id}`);
  }

  setMunicipality(data: DataMunicipality): Observable<DataMunicipality> {
    return this.httpClient.post<DataMunicipality>(`${environment.api}${this.MUNICIPALITY}`, data);
  }

  updateMunicipality(id: string, data: DataMunicipality): Observable<Municipality> {
    return this.httpClient.put<Municipality>(`${environment.api}${this.MUNICIPALITY}/${id}`, data);
  }
}

export interface DataMunicipality {
  id?: string;
  state: string;
  name: string;
}
