import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'diagnostic-report',
    loadChildren: () => import('./diagnostic-report/diagnostic-report.module').
    then(m => m.DiagnosticReportModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
