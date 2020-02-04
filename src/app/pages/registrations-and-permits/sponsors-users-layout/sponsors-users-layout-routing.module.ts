import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorsUsersLayoutComponent } from './sponsors-users-layout.component';

const routes: Routes = [
  { component: SponsorsUsersLayoutComponent, path: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorsUsersLayoutRoutingModule { }
