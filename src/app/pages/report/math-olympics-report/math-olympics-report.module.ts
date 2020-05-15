import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathOlympicsReportRoutingModule } from './math-olympics-report-routing.module';
import { MathOlympicsReportComponent } from './math-olympics-report.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MathOlympicsReportComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    MathOlympicsReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule
  ]
})
export class MathOlympicsReportModule { }
