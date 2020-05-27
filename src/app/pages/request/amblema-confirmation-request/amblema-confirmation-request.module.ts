import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmblemaConfirmationRequestRoutingModule } from './amblema-confirmation-request-routing.module';
import { AmblemaConfirmationRequestComponent } from './amblema-confirmation-request.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [AmblemaConfirmationRequestComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbCardModule,
    AmblemaConfirmationRequestRoutingModule
  ]
})
export class AmblemaConfirmationRequestModule { }
