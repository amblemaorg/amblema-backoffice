import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  private readonly USER_REPORT = 'statistics/0';

  constructor( private httpClient: HttpClient ) { }

  getUserReport( status: string) : Observable<any> {
    
    return this.httpClient.get<any>(`${environment.api}${this.USER_REPORT}?status=${status}`)
      .pipe(
        map( (data: any) => data )
      );
    // return this.httpClient.get<DiagnosticReport>(`
    // ${environment.api}${this.DIAGNOSTIC_REPORT}/${schoolYearId}/${schoolId}?diagnostics=${this.prepareDiagnosticsString(diagnostics)}`)
    //   .pipe(
    //     map((data: any) => data)
    //   );
  }
}
