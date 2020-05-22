import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledSchoolsReportRoutingModule } from './enrolled-schools-report-routing.module';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphDisplayComponent } from './graph-display/graph-display.component';
import { GraphicReportModule } from '../../_shared/graphic-report/graphic-report.module';


@NgModule({
  declarations: [EnrolledSchoolsReportComponent, GraphDisplayComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    FormsModule,
    GraphicReportModule,
    ReactiveFormsModule,
    CommonModule,
    EnrolledSchoolsReportRoutingModule
  ]
})
export class EnrolledSchoolsReportModule { }
