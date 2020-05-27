import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmblemaConfirmationRequestRoutingModule } from './amblema-confirmation-request-routing.module';
import { AmblemaConfirmationRequestComponent } from './amblema-confirmation-request.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [AmblemaConfirmationRequestComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    AmblemaConfirmationRequestRoutingModule
  ]
})
export class AmblemaConfirmationRequestModule { }
