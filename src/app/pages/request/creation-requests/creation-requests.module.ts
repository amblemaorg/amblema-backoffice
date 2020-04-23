import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRequestsRoutingModule } from './creation-requests-routing.module';
import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreationRequestsComponent],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbAlertModule,
    CreationRequestsRoutingModule
  ]
})
export class CreationRequestsModule { }
