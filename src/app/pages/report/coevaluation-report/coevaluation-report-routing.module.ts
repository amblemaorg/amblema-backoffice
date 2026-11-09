import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoevaluationReportComponent } from './coevaluation-report.component';

const routes: Routes = [{ path: '', component: CoevaluationReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoevaluationReportRoutingModule {}
