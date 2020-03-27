import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { NbCardModule, NbButtonModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { ProjectFormComponent } from './project-form/project-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../components/form-components/reactive-input/reactive-input.module';
import { SelectSchoolComponent } from './select-school/select-school.component';
import { SelectSponsorComponent } from './select-sponsor/select-sponsor.component';
import { SelectCoordinatorComponent } from './select-coordinator/select-coordinator.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectFormComponent,
    SelectSchoolComponent,
    SelectSponsorComponent,
    SelectCoordinatorComponent,
    ProjectDetailsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NbSpinnerModule,
    NbAlertModule,
    ModalModule,
    NgSelectModule,
    ReactiveInputModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
