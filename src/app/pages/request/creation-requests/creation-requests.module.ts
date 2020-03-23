import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRequestsRoutingModule } from './creation-requests-routing.module';
import { CreationRequestsComponent } from './creation-requests.component';


@NgModule({
  declarations: [CreationRequestsComponent],
  imports: [
    CommonModule,
    CreationRequestsRoutingModule
  ]
})
export class CreationRequestsModule { }
