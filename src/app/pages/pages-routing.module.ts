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
                path: '',
                component: DashboardLayoutComponent
            },
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
