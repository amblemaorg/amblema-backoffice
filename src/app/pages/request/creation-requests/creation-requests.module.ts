import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRequestsRoutingModule } from './creation-requests-routing.module';
import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressModule } from '../../_components/shared/progress/progress.module';
import { MapModule } from '../../_components/shared/map/map.module';
import { AgmCoreModule } from '@agm/core';


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
    CreationRequestsRoutingModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyCwPUm3Rnxmi3klwT1Qg4Z2AK0dBLG_xxx',
       apiKey: 'AIzaSyCwPUm3Rnxmi3klwT1Qg4Z2AK0dBLG_yrs',
      libraries: ['places'],
      region: 'Venezuela',
      language: 'es'
    }),

  ]
})
export class CreationRequestsModule { }
