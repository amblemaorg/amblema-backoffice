import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectRequestsComponent } from './project-requests.component';


const routes: Routes = [
  { path: '', component: ProjectRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRequestsRoutingModule { }
