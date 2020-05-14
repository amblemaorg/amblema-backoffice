import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'diagnostic-report',
    loadChildren: () => import('./diagnostic-report/diagnostic-report.module').
    then(m => m.DiagnosticReportModule)
  },
  {
    path: 'sponsor-reporte',
    loadChildren: () => import('./sponsor-report/sponsor-report.module')
    .then( m => m.SponsorReportModule )
  },
  {
    path: 'user-report',
    loadChildren: () => import('./user-report/user-report.module').
    then(m => m.UserReportModule)
  },
  {
    path: 'math-olympics-report',
    loadChildren: () => import('./math-olympics-report/math-olympics-report.module').
    then(m => m.MathOlympicsReportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
