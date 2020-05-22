import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledSchoolsReportRoutingModule } from './enrolled-schools-report-routing.module';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicReportModule } from '../../_shared/graphic-report/graphic-report.module';

@NgModule({
  declarations: [EnrolledSchoolsReportComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    FormsModule,
    GraphicReportModule,
    ReactiveFormsModule,
    CommonModule,
    NbIconModule,
    EnrolledSchoolsReportRoutingModule
  ]
})
export class EnrolledSchoolsReportModule { }
