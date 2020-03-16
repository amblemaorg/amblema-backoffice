import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
