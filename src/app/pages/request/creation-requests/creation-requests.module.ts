import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRequestsRoutingModule } from './creation-requests-routing.module';
import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { ProgressModule } from '../../_components/shared/progress/progress.module';
import { MapModule } from '../../_components/shared/map/map.module';


@NgModule({
  declarations: [CreationRequestsComponent],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    MapModule,
    FormsModule,
    ProgressModule,
    NbButtonModule,
    NbAlertModule,
    CreationRequestsRoutingModule
  ]
})
export class CreationRequestsModule { }
