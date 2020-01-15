import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './layouts/profile/profile.component';

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
                path: 'profile',
                component: ProfileComponent
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
