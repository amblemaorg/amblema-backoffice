import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRequestsRoutingModule } from './creation-requests-routing.module';
import { CreationRequestsComponent } from './creation-requests.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [CreationRequestsComponent],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    CreationRequestsRoutingModule
  ]
})
export class CreationRequestsModule { }
