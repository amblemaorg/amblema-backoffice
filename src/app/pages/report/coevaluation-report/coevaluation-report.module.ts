import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoevaluationReportRoutingModule } from './coevaluation-report-routing.module';
import { CoevaluationReportComponent } from './coevaluation-report.component';

@NgModule({
  declarations: [CoevaluationReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbTabsetModule,
    NgSelectModule,
    CoevaluationReportRoutingModule,
  ],
})
export class CoevaluationReportModule {}
