import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

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
                loadChildren: () => import('./layouts/admin-users-layout/admin-users-layout.module').then(m => m.AdminUsersLayoutModule)
            },
            {
                path: 'permissions',
                loadChildren: () => import('./layouts/permissions-layout/permissions-layout.module').then(m => m.PermissionsLayoutModule)
            },
            {
                path: 'coordinators-users',
                loadChildren: () => import('./layouts/coordinators-users-layout/coordinators-users-layouts.module')
                .then(m => m.CoordinatorsUsersLayoutsModule)
            },
            {
                path: 'sponsors-users',
                loadChildren: () => import('./layouts/sponsors-users-layout/sponsors-users-layout.module').
                then(m => m.SponsorsUsersLayoutModule)
            },
            {
                path: 'schools-users',
                loadChildren: () => import('./layouts/schools-users-layout/schools-users-layout.module').
                then(m => m.SchoolsUsersLayoutModule)
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
