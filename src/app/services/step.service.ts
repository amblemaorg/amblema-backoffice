import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Step } from '../models/step.model';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class StepService {

  private readonly STEP = 'steps';

  constructor( private httpClient: HttpClient ) { }

  setStep(data: FormData): Observable<Step> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': '',
        Accept: 'multipart/form-data',
      }),

    };

    return this.httpClient.post<Step>(`${environment.api}${this.STEP}`, data,  httpOptions);
  }
}
