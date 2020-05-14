import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OlympicsReport } from 'src/app/models/report/ math-olympics-report.model';

@Injectable({
  providedIn: 'root'
})
export class MathOlympicsReportService {

  private readonly MATH_OLYMPICS_REPORT = `statistics/olympicsreport/`;
  private readonly SCHOOL_YEARS = `schoolyears`;

  constructor(private httpClient: HttpClient) { }

  getMathOlympicsReport( startPeriodId: string, endPeriodId: string ): Observable<OlympicsReport> {
    return this.httpClient.get<OlympicsReport>(`${environment.api}${this.MATH_OLYMPICS_REPORT}`)
    .pipe(
      map( (data: any) => data )
    );
  }

  getSchoolYears(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}${this.SCHOOL_YEARS}`)
    .pipe(
      map( (data: any) => data )
    );
  }
}
