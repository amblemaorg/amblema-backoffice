import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LapseActivity, Activity } from '../models/lapse-activities.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LapseActivitiesService {

  private readonly LAPSE_ACTIVITY = 'pecasetting/activities';

  constructor( private httpClient: HttpClient ) { }

  getLapseActivities(): Observable<LapseActivity> {
    return this.httpClient.get<LapseActivity>(`${environment.api}${this.LAPSE_ACTIVITY}`)
      .pipe(
        map((data: any) => data)
      );
  }

  getActivity( id: string, lapse: any ): Observable<Activity> {
    return this.httpClient.get<Activity>(`${environment.api}${this.LAPSE_ACTIVITY}/${id}/${lapse}`).
      pipe(
        map( (data: any) => data )
      );
  }

  statusActivity( data: any ): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.LAPSE_ACTIVITY}`, data);
  }

  createActivity( lapse: string, data: FormData ): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.LAPSE_ACTIVITY}/${lapse}`, data);
  }
}
