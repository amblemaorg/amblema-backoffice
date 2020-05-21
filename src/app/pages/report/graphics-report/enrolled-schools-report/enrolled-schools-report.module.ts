import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledSchoolsReportRoutingModule } from './enrolled-schools-report-routing.module';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';


@NgModule({
  declarations: [EnrolledSchoolsReportComponent],
  imports: [
    CommonModule,
    EnrolledSchoolsReportRoutingModule
  ]
})
export class EnrolledSchoolsReportModule { }
