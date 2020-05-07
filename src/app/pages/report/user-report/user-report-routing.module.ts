import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserReportComponent } from './user-report.component';

const routes: Routes = [
  { path: '', component: UserReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReportRoutingModule { }
