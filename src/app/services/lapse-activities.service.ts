import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LapseActivity, Activity } from '../_models/lapse-activities.model';
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

  updateActivity( id: string, lapse: any, data: FormData ): Observable<any> {
    console.log( `${environment.api}${this.LAPSE_ACTIVITY}/${id}/${lapse}` );
    return this.httpClient.put<Activity>(`${environment.api}${this.LAPSE_ACTIVITY}/${id}/${lapse}`, data, {
      reportProgress: true,
      observe: 'body'
    }).
      pipe(
        map( (records: any) => records )
      );
  }

  statusActivity( data: any ): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.LAPSE_ACTIVITY}`, data);
  }

  createActivity( lapse: string, data: FormData ): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}${this.LAPSE_ACTIVITY}/${lapse}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteActivity( id: string, lapse: string ): Observable<any>  {
    return this.httpClient.delete<any>(`${environment.api}${this.LAPSE_ACTIVITY}/${id}/${lapse}`);
  }
}
