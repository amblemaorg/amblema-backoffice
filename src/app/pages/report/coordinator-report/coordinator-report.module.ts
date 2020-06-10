import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorReportRoutingModule } from './coordinator-report-routing.module';
import { CoordinatorReportComponent } from './coordinator-report.component';
import { NbCardModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbRadioModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [CoordinatorReportComponent],
  imports: [
    CommonModule,
    CoordinatorReportRoutingModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbRadioModule

  ]
})
export class CoordinatorReportModule { }
