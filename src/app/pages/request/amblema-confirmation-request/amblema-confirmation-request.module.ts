import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmblemaConfirmationRequestRoutingModule } from './amblema-confirmation-request-routing.module';
import { AmblemaConfirmationRequestComponent } from './amblema-confirmation-request.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbAlertModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InformationDetailsComponent } from './_shared/information-details/information-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressModule } from '../../_components/shared/progress/progress.module';


@NgModule({
  entryComponents: [ InformationDetailsComponent ],
  declarations: [AmblemaConfirmationRequestComponent, InformationDetailsComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    ProgressModule,
    ReactiveFormsModule,
    NbAlertModule,
    AmblemaConfirmationRequestRoutingModule,
    NbDialogModule.forChild()
  ]
})
export class AmblemaConfirmationRequestModule { }
