import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesActionsComponent } from './roles-actions/roles-actions.component';
import { PermissionsLayoutComponent } from './permissions-layout.component';

const routes: Routes = [
  {
    component: PermissionsLayoutComponent,
    path: '',
    children: [
      {
        path: '',
        // Internal navigation on this component
        component: RolesTableComponent
      },
      {
        path: 'actions',
        component: RolesActionsComponent,
      },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full'  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsLayoutRoutingModule { }
