import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticReportComponent } from './diagnostic-report.component';

const routes: Routes = [
  { path: '', component: DiagnosticReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticReportRoutingModule { }
