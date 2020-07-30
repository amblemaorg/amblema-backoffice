import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelActivityStrategy } from '../store/activity-strategy.action';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ActivityStrategyService {
  private readonly ACTIVITY_STRATEGY: string = 'pecasetting/monitoringactivities';

  constructor(private httpClient: HttpClient) {}

  getActivityStrategy(): Observable<ModelActivityStrategy> {
    return this.httpClient
      .get<ModelActivityStrategy>(`${environment.api}${this.ACTIVITY_STRATEGY}`);
  }

  updateActivityStrategy(data: any): Observable<any> {
    return this.httpClient
    .post<any>(`${environment.api}${this.ACTIVITY_STRATEGY}`, data, {
      reportProgress: true,
      observe: 'events',
    });

  }
}
