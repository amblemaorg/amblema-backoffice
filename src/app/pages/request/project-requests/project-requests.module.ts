import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestsRoutingModule } from './project-requests-routing.module';
import { ProjectRequestsComponent } from './project-requests.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressModule } from '../../_components/shared/progress/progress.module';
import { MapModule } from '../../_components/shared/map/map.module';


@NgModule({
  declarations: [ProjectRequestsComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    ModalModule,
    MapModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressModule,
    ProjectRequestsRoutingModule,
    NbAlertModule
  ]
})
export class ProjectRequestsModule { }
