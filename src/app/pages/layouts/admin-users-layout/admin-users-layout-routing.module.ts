import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersLayoutComponent } from './admin-users-layout.component';


const routes: Routes = [
  { component: AdminUsersLayoutComponent, path: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersLayoutRoutingModule { }
