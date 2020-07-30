import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelActivityStrategy } from '../store/activity-strategy.action';

@Injectable({
  providedIn: 'root'
})
export class ActivityStrategyService {

  constructor( private httpClient: HttpClient ) { }

  getActivityStrategy(  ): Observable<ModelActivityStrategy> {
    return this.httpClient.get<ModelActivityStrategy>(``);
  }
}
