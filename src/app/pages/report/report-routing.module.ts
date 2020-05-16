import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'diagnostic-report',
    loadChildren: () => import('./diagnostic-report/diagnostic-report.module').
    then(m => m.DiagnosticReportModule)
  },
  {
    path: 'sponsor-report',
    loadChildren: () => import('./sponsor-report/sponsor-report.module')
    .then( m => m.SponsorReportModule )
  },
  {
    path: 'coordinator-report',
    loadChildren: () => import('./coordinator-report/coordinator-report.module')
    .then( m => m.CoordinatorReportModule )
  },
  {
    path: 'school-report',
    loadChildren: () => import('./school-report/school-report.module')
    .then( m => m.SchoolReportModule )
  },
  {
    path: 'teacher-report',
    loadChildren: () => import('./teacher-report/teacher-report.module')
    .then( m => m.TeacherReportModule )
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
