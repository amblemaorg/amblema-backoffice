import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorReportRoutingModule } from './sponsor-report-routing';
import { SponsorReportComponent } from './sponsor-report.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SponsorReportComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    SponsorReportRoutingModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    FormsModule,
    NbIconModule
  ]
})
export class SponsorReportModule { }
