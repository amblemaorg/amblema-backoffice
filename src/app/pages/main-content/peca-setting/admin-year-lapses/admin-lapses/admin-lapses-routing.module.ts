import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLapsesComponent } from './admin-lapses.component';


const routes: Routes = [
  { path: '', component: AdminLapsesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLapsesRoutingModule { }
