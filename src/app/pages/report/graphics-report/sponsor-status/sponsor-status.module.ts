import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorStatusRoutingModule } from './sponsor-status-routing.module';
import { SponsorStatusComponent } from './sponsor-status.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbAlertModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicReportModule } from '../../_shared/graphic-report/graphic-report.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [SponsorStatusComponent],
  imports: [

    NbCardModule,
    NbButtonModule,
    FormsModule,
    GraphicReportModule,
    ReactiveFormsModule,
    CommonModule,
    NbIconModule,
    SponsorStatusRoutingModule, 
    NgSelectModule,
    NbAlertModule, 
    NbSpinnerModule,
  ]
})
export class SponsorStatusModule { }
