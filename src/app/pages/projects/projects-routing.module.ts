import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectModulesComponent } from './project-modules/project-modules.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'modules/:id', component: ProjectModulesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
