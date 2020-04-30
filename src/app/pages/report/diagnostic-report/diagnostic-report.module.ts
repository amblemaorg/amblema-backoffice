import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticReportRoutingModule } from './diagnostic-report-routing.module';
import { DiagnosticReportComponent } from './diagnostic-report.component';
import { NbCardModule, NbCheckboxModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SchoolYearService } from 'src/app/services/school-year.service';


@NgModule({
  declarations: [DiagnosticReportComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NbCheckboxModule,
    NbButtonModule,
    NbIconModule,
    DiagnosticReportRoutingModule
  ],
  providers: [
    SchoolYearService
  ]
})
export class DiagnosticReportModule { }
