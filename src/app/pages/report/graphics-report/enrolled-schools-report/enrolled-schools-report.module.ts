import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledSchoolsReportRoutingModule } from './enrolled-schools-report-routing.module';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicReportModule } from '../../_shared/graphic-report/graphic-report.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EnrolledSchoolsReportComponent],
  imports: [
    NbCardModule,
    NbButtonModule,
    FormsModule,
    GraphicReportModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    NbIconModule,
    NbAlertModule,
    EnrolledSchoolsReportRoutingModule,
    NbSpinnerModule
  ]
})
export class EnrolledSchoolsReportModule { }
