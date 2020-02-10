import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { State } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly URL = 'states';

  constructor( private httpClient: HttpClient ) { }

  getState() : Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.URL}`);
  }
}
