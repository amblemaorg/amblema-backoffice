import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HqsAwardReport } from 'src/app/_models/report/hqs-award-report.model';

@Injectable({
  providedIn: 'root',
})
export class HqsAwardReportService {
  private readonly HQS_AWARD_REPORT = 'statistics/hqsawardsreport';

  constructor(private httpClient: HttpClient) {}

  getReport(schoolYearId: string, schoolId?: string | null): Observable<HqsAwardReport> {
    let params = new HttpParams();
    if (schoolId) {
      params = params.set('schoolId', schoolId);
    }
    return this.httpClient.get<HqsAwardReport>(
      `${environment.api}${this.HQS_AWARD_REPORT}/${schoolYearId}`,
      { params }
    );
  }
}
