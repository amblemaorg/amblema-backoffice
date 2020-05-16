import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherReportComponent } from './teacher-report.component';

const routes: Routes = [
  { path: '', component: TeacherReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherReportRoutingModule { }
