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

  // setLapseActivitie( data: LapseActivitie ): Observable<LapseActivitie> {
  //    return this.httpClient.post<LapseActivitie>(`${environment.api}${this.PROJECT}`, data);
  // }

  // deleteLapseActivitie(id: string): Observable<string> {
  //   return this.httpClient.delete<string>(`${environment.api}${this.PROJECT}/${id}`);
  // }

  // updateLapseActivitie( id: string,  data: LapseActivitie): Observable<LapseActivitie> {
  //   return this.httpClient.put<LapseActivitie>(`${environment.api}${this.PROJECT}/${id}`, data);
  // }
}
