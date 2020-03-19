import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LapseComponent } from './lapse.component';


const routes: Routes = [
  { path: '', component: LapseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LapseRoutingModule { }
