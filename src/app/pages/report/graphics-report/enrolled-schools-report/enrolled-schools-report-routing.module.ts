import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolledSchoolsReportComponent } from './enrolled-schools-report.component';

const routes: Routes = [
  { path: '', component: EnrolledSchoolsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrolledSchoolsReportRoutingModule { }
