import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityStrategiesComponent } from './activity-strategies.component';

const routes: Routes = [
  { path: '', component: ActivityStrategiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityStrategiesRoutingModule { }
