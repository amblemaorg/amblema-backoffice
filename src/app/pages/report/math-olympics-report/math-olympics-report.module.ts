import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathOlympicsReportRoutingModule } from './math-olympics-report-routing.module';
import { MathOlympicsReportComponent } from './math-olympics-report.component';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [MathOlympicsReportComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    MathOlympicsReportRoutingModule
  ]
})
export class MathOlympicsReportModule { }
