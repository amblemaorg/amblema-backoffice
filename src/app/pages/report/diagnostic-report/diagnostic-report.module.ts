import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticReportRoutingModule } from './diagnostic-report-routing.module';
import { DiagnosticReportComponent } from './diagnostic-report.component';
import { NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DiagnosticReportComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NbCheckboxModule,
    DiagnosticReportRoutingModule
  ]
})
export class DiagnosticReportModule { }
