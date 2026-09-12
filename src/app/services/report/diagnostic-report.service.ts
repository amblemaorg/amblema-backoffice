import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
    const selected: string[] = [];

    diagnostics.forEach(diagnostic => {
      if (diagnostic.value) {
        if (diagnostic.label === 'Ambiente') {
          selected.push('environmental');
        } else if (diagnostic.label === 'Matemática') {
          selected.push('math');
        } else if (diagnostic.label === 'Lectura') {
          selected.push('reading');
        } else if (diagnostic.label === 'Lógica') {
          selected.push('logic');
        }
      }
    });
    return selected.join(',');
  }

  getPinsReport(schoolYearId: string) {
    return this.httpClient.get<any>(`${environment.api}statistics/pinsreport/${schoolYearId}`)
      .pipe(
        map((data: any) => data)
      );
  }
}
