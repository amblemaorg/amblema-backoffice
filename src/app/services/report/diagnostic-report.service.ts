import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticReportService {

  private readonly DIAGNOSTIC_REPORT = 'statistics/diagnosticsreport';

  constructor(private httpClient: HttpClient) { }

  getReport(schoolYearId: string, schoolId: string, diagnostics: Array<any>) {
    return this.httpClient.get<DiagnosticReport>(`
    ${environment.api}${this.DIAGNOSTIC_REPORT}/${schoolYearId}/${schoolId}?diagnostics=${this.prepareDiagnosticsString(diagnostics)}`)
      .pipe(
        map((data: any) => data)
      );
  }

  prepareDiagnosticsString(diagnostics: Array<any>): string {

    let compose: string;

    diagnostics.forEach(diagnostic => {
      if (diagnostic.value) {
        compose = diagnostic.label === 'Matemática' ? 'math'
          : diagnostic.label === 'Lectura' ? `${compose ? compose + ',' : ''}reading`
            : diagnostic.label === 'Lógica' ? `${compose ? compose + ',' : ''}logic` : '';
      }
    });
    return compose;
  }
}
