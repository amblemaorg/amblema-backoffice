import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MathOlympicsReportComponent } from './math-olympics-report.component';

const routes: Routes = [
  { path: '', component: MathOlympicsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathOlympicsReportRoutingModule { }
