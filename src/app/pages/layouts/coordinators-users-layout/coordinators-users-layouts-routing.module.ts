import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';

const routes: Routes = [
  { component: CoordinatorsUsersLayoutsComponent, path: '', }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorsUsersLayoutsRoutingModule { }
