import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GeneralEnrolled } from '../models/_enrolled/general-enrolled.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrolledService {
  readonly ENROLLED = `enrollment`;
  readonly SCHOOL_YEAR = `schoolyears`;

  constructor(private httpClient: HttpClient) {}

  getSchoolYears(): Observable<SchoolYearEnrolled[]> {
    return this.httpClient
      .get<SchoolYearEnrolled[]>(`${environment.api}${this.SCHOOL_YEAR}`)
      .pipe(map((data: any) => data.dates));
  }

  setNewSchoolYear( value: string ) :Observable<any> {
     return this.httpClient.post<string>(
      `${environment.api}${this.SCHOOL_YEAR}`,
      { name: value } // <-- Symbolic value
    );
  }

  getEnrollment(): Observable<GeneralEnrolled> {
    return this.httpClient
      .get<GeneralEnrolled>(`${environment.api}${this.ENROLLED}`)
      .pipe(map((data: any) => data));
  }

  enrollSchools(id: string): Observable<string> {
    return this.httpClient.put<string>(
      `${environment.api}${this.ENROLLED}/${id}`,
      {}
    );
  }

  removeEnrolledSchool(id: string): Observable<string> {
    return this.httpClient.put<string>(
      `${environment.api}${this.ENROLLED}/${id}?action=delete`,
      {}
    );
  }
}
