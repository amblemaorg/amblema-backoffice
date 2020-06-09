import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GeneralEnrolled } from '../models/_enrolled/general-enrolled.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrolledService {

  readonly ENROLLED = `enrollment`;
  readonly SCHOOL_YEAR = `schoolyears`;

  constructor( private httpClient: HttpClient ) { }

  getSchoolYear(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.SCHOOL_YEAR}`)
    .pipe(
      map( (data: any) => data )
    );
  }

  getEnrollment(): Observable<GeneralEnrolled> {
    return this.httpClient.get<GeneralEnrolled>(`${environment.api}${this.ENROLLED}`)
    .pipe(
      map( (data: any) => data )
    );

  }

  enrollSchools() {

  }
}
