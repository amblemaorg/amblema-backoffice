import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HqsAwardReportComponent } from './hqs-award-report.component';

const routes: Routes = [{ path: '', component: HqsAwardReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HqsAwardReportRoutingModule {}
