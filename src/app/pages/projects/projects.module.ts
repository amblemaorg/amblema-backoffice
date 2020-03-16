import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { NbCardModule } from '@nebular/theme';
import { ProjectFormComponent } from './project-form/project-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../components/shared/modal/modal-forms/modal.module';


@NgModule({
  declarations: [ProjectsComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,

    ModalModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
