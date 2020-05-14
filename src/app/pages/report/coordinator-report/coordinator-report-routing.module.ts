import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatorReportComponent } from './coordinator-report.component';

const routes: Routes = [
  { path: '', component: CoordinatorReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorReportRoutingModule { }
