import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolYear } from '../models/report/school-year.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  private readonly SCHOOL_YEARS = 'schoolyears';

  constructor( private httpClient: HttpClient ) { }

  getSchoolYears(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.SCHOOL_YEARS}`)
    .pipe(
      map( (data: any) => data.records )
    );
  }
}
