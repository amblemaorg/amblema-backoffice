import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CoevaluationReport,
  CoevaluationLevelCode,
} from 'src/app/_models/report/coevaluation-report.model';

@Injectable({
  providedIn: 'root',
})
export class CoevaluationReportService {
  private readonly COEVALUATION_REPORT = 'statistics/coevaluationsreport';

  constructor(private httpClient: HttpClient) {}

  getReport(
    schoolYearId: string,
    schoolId?: string | null,
    level?: CoevaluationLevelCode | null
  ): Observable<CoevaluationReport> {
    let params = new HttpParams();
    if (schoolId) {
      params = params.set('schoolId', schoolId);
    }
    if (level) {
      params = params.set('level', level);
    }
    return this.httpClient.get<CoevaluationReport>(
      `${environment.api}${this.COEVALUATION_REPORT}/${schoolYearId}`,
      { params }
    );
  }
}
