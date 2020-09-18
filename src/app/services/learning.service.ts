import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Learning } from '../_models/learning.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private readonly LEARNING: string = 'learningmodules';

  constructor(private httpClient: HttpClient) { }

  getLearnings(): Observable<Learning[]> {
    return this.httpClient.get<Learning[]>(`${environment.api}${this.LEARNING}`)
      .pipe(
        map((data: any) => data.records)
      );
  }

  updateLearning( id: string, data: Learning ): Observable<any> {
    return this.httpClient.put<Learning>(`${environment.api}${this.LEARNING}/${id}`, data, {
      reportProgress: true,
      observe: 'body'
    });
  }

  setLearning(data: Learning): Observable<any> {
      return this.httpClient.post<Learning>(`${environment.api}${this.LEARNING}`, data, {
        reportProgress: true,
        observe: 'events'
      } );
  }

  deleteLearning(id: string): Observable<Learning> {
    return this.httpClient.delete<Learning>(`${environment.api}${this.LEARNING}/${id}`);
  }
}
