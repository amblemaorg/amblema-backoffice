import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';

import { HqsAwardReportRoutingModule } from './hqs-award-report-routing.module';
import { HqsAwardReportComponent } from './hqs-award-report.component';

@NgModule({
  declarations: [HqsAwardReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NgSelectModule,
    HqsAwardReportRoutingModule,
  ],
})
export class HqsAwardReportModule {}
