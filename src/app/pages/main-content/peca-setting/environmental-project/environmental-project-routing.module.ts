import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentalProjectComponent } from './environmental-project.component';

const routes: Routes = [
  { path: '', component: EnvironmentalProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvironmentalProjectRoutingModule { }
