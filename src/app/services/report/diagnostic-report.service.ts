import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticReportService {

  private readonly DIAGNOSTIC_REPORT = '/statistics/diagnosticsreport';

  constructor( private httpClient: HttpClient ) { }

  getReport( schoolYearId:string, schoolId: string ) {

  }
}
