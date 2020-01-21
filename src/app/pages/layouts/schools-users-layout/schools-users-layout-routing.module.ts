import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsUsersLayoutComponent } from './schools-users-layout.component';

const routes: Routes = [
  { component: SchoolsUsersLayoutComponent, path: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsUsersLayoutRoutingModule { }
