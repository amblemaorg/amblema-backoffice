import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'admin-users',
              //  loadChildren: () =>
              //    import('./user/roles-and-permits/admin-user/admin-user.module').then(
              //      (m) => m.AdminUserModule
              //    ),
             loadChildren: () =>
               import(
                 './user/roles-and-permits/admin-users-layout/admin-users-layout.module'
               ).then((m) => m.AdminUsersLayoutModule),
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import(
            './user/roles-and-permits/permissions-layout/permissions-layout.module'
          ).then((m) => m.PermissionsLayoutModule),
      },
      {
        path: 'coordinators-users',
        loadChildren: () =>
          import(
            './user/sign-up/coordinators-users-layout/coordinators-users-layouts.module'
          ).then((m) => m.CoordinatorsUsersLayoutsModule),
      },
      {
        path: 'sponsors-users',
        loadChildren: () =>
          import(
            './user/sign-up/sponsors-users-layout/sponsors-users-layout.module'
          ).then((m) => m.SponsorsUsersLayoutModule),
      },
      {
        path: 'schools-users',
        loadChildren: () =>
          import(
            './user/sign-up/schools-users-layout/schools-users-layout.module'
          ).then((m) => m.SchoolsUsersLayoutModule),
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('./request/request.module').then((m) => m.RequestModule),
        children: [
          {
            path: 'creation-requests',
            loadChildren: () =>
              import(
                './request/creation-requests/creation-requests.module'
              ).then((m) => m.CreationRequestsModule),
          },
          {
            path: 'project-requests',
            loadChildren: () =>
              import('./request/project-requests/project-requests.module').then(
                (m) => m.ProjectRequestsModule
              ),
          },
          {
            path: 'requests-validate-information',
            loadChildren: () =>
              import(
                './request/requests-validate-information/requests-validate-information.module'
              ).then((m) => m.RequestsValidateInformationModule),
          },
          {
            path: 'amblema-confirmation-request',
            loadChildren: () =>
              import(
                './request/amblema-confirmation-request/amblema-confirmation-request.module'
              ).then((m) => m.AmblemaConfirmationRequestModule),
          },
        ],
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./main-content/main-content.module').then(
            (m) => m.MainContentModule
          ),
        children: [
          {
            path: 'web',
            loadChildren: () =>
              import('./main-content/web-content/web-content.module').then(
                (m) => m.WebContentModule
              ),
          },
          {
            path: 'steps',
            loadChildren: () =>
              import('./main-content/steps/steps.module').then(
                (m) => m.StepsModule
              ),
          },
          {
            path: 'learning',
            loadChildren: () =>
              import('./main-content/learning/learning.module').then(
                (m) => m.LearningModule
              ),
          },
          {
            path: 'peca-setting',
            loadChildren: () =>
              import('./main-content/peca-setting/peca-setting.module').then(
                (m) => m.PecaSettingModule
              ),
          },
        ],
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
        children: [
          {
            path: 'diagnostic-report',
            loadChildren: () =>
              import(
                './report/diagnostic-report/diagnostic-report.module'
              ).then((m) => m.DiagnosticReportModule),
          },
          {
            path: 'sponsor-report',
            loadChildren: () =>
              import('./report/sponsor-report/sponsor-report.module').then(
                (m) => m.SponsorReportModule
              ),
          },
          {
            path: 'coordinator-report',
            loadChildren: () =>
              import(
                './report/coordinator-report/coordinator-report.module'
              ).then((m) => m.CoordinatorReportModule),
          },
          {
            path: 'school-report',
            loadChildren: () =>
              import('./report/school-report/school-report.module').then(
                (m) => m.SchoolReportModule
              ),
          },
          {
            path: 'teacher-report',
            loadChildren: () =>
              import('./report/teacher-report/teacher-report.module').then(
                (m) => m.TeacherReportModule
              ),
          },
          {
            path: 'math-olympics-report',
            loadChildren: () =>
              import(
                './report/math-olympics-report/math-olympics-report.module'
              ).then((m) => m.MathOlympicsReportModule),
          },
          {
            path: 'enrolled-schools-report',
            loadChildren: () =>
              import(
                './report/graphics-report/enrolled-schools-report/enrolled-schools-report.module'
              ).then((m) => m.EnrolledSchoolsReportModule),
          },
          {
            path: 'sponsor-status',
            loadChildren: () =>
              import(
                './report/graphics-report/sponsor-status/sponsor-status.module'
              ).then((m) => m.SponsorStatusModule),
          },
        ],
      },
      // Redirect To
      {
        path: '',
        redirectTo: 'dashboard',
      },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class DashboardRoutingModule {}
