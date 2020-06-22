import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { SchoolYear } from '../_models/report/school-year.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  private readonly SCHOOL_YEARS = 'schoolyears';

  constructor( private httpClient: HttpClient ) { }

  getSchoolYears(): Observable<SchoolYear[]> {

    return this.httpClient.get<SchoolYear[]>(`${environment.api}${this.SCHOOL_YEARS}`)
    .pipe(
      map( (data: any) => data.records )
    );
  }
}
