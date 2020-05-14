import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorReportRoutingModule } from './sponsor-report-routing';
import { SponsorReportComponent } from './sponsor-report.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [SponsorReportComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    SponsorReportRoutingModule, 
    NbCardModule,
    NbButtonModule
  ]
})
export class SponsorReportModule { }
