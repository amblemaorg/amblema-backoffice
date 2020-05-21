import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledSchoolsReportRoutingModule } from './enrolled-schools-report-routing.module';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EnrolledSchoolsReportComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EnrolledSchoolsReportRoutingModule
  ]
})
export class EnrolledSchoolsReportModule { }
