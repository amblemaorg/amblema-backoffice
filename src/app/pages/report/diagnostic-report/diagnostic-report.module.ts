import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticReportRoutingModule } from './diagnostic-report-routing.module';
import { DiagnosticReportComponent } from './diagnostic-report.component';
import { NbCardModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [DiagnosticReportComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NgSelectModule,
    DiagnosticReportRoutingModule
  ]
})
export class DiagnosticReportModule { }
