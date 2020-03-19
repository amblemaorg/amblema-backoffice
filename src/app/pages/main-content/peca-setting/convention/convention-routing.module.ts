import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConventionComponent } from './convention.component';

const routes: Routes = [
  { path: '', component: ConventionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConventionRoutingModule { }
