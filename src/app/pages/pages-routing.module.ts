import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './registrations-and-permits/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardLayoutComponent
            },
            {
                path: 'admin-users',
                loadChildren: () => import('./registrations-and-permits/admin-users-layout/admin-users-layout.module').
                    then(m => m.AdminUsersLayoutModule)
            },
            {
                path: 'permissions',
                loadChildren: () => import('./registrations-and-permits/permissions-layout/permissions-layout.module').
                    then(m => m.PermissionsLayoutModule)
            },
            {
                path: 'coordinators-users',
                loadChildren: () => import('./registrations-and-permits/coordinators-users-layout/coordinators-users-layouts.module')
                    .then(m => m.CoordinatorsUsersLayoutsModule)
            },
            {
                path: 'sponsors-users',
                loadChildren: () => import('./registrations-and-permits/sponsors-users-layout/sponsors-users-layout.module').
                    then(m => m.SponsorsUsersLayoutModule)
            },
            {
                path: 'schools-users',
                loadChildren: () => import('./registrations-and-permits/schools-users-layout/schools-users-layout.module').
                    then(m => m.SchoolsUsersLayoutModule)
            },
            {
                path: 'requests',
                loadChildren: () => import('./request/request.module').
                    then(m => m.RequestModule),
                children: [
                    {
                        path: 'creation-requests',
                        loadChildren: () => import('./request/creation-requests/creation-requests.module').
                            then(m => m.CreationRequestsModule)
                    },
                    {
                        path: 'project-requests',
                        loadChildren: () => import('./request/project-requests/project-requests.module').
                            then(m => m.ProjectRequestsModule)
                    },
                    {
                        path: 'requests-validate-information',
                        loadChildren: () => import('./request/requests-validate-information/requests-validate-information.module').
                            then(m => m.RequestsValidateInformationModule)
                    }
                ]
            },
            {
                path: 'content',
                loadChildren: () => import('./main-content/main-content.module').
                    then(m => m.MainContentModule),
                children: [
                    {
                        path: 'web',
                        loadChildren: () => import('./main-content/web-content/web-content.module').
                            then(m => m.WebContentModule)
                    },
                    {
                        path: 'steps',
                        loadChildren: () => import('./main-content/steps/steps.module').
                            then(m => m.StepsModule)
                    },
                    {
                        path: 'learning',
                        loadChildren: () => import('./main-content/learning/learning.module').
                            then(m => m.LearningModule)
                    },
                    {
                        path: 'peca-setting',
                        loadChildren: () => import('./main-content/peca-setting/peca-setting.module').
                            then(m => m.PecaSettingModule)
                    }
                ]
            },
            {
                path: 'projects',
                loadChildren: () => import('./projects/projects.module').
                    then(m => m.ProjectsModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
                children: [
                    {
                        path: 'diagnostic-report',
                        loadChildren: () => import('./report/diagnostic-report/diagnostic-report.module')
                        .then(m => m.DiagnosticReportModule),
                    },
                    {
                        path: 'user-report',
                        loadChildren: () => import('./report/user-report/user-report.module')
                        .then(m => m.UserReportModule),
                    }
                ]
            },
            // Redirect To
            {
                path: '',
                redirectTo: 'dashboard'
            }
        ]
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class DashboardRoutingModule { }
