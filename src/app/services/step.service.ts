import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Step } from '../_models/step.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StepService {

  private readonly STEP = 'steps';

  constructor(private httpClient: HttpClient) { }

  setStep(data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.STEP}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getSteps(): Observable<Step[]> {
    return this.httpClient.get<Step[]>(`${environment.api}${this.STEP}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  updateStep( id: string,  data: FormData): Observable<any> {
    return this.httpClient.put<any>(`${environment.api}${this.STEP}/${id}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteStep(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${environment.api}${this.STEP}/${id}`);
  }
}
