import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsValidateInformationRoutingModule } from './requests-validate-information-routing.module';
import { RequestsValidateInformationComponent } from './requests-validate-information.component';
import { NbCardModule, NbDialogModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InformationDetailsComponent } from './information-details/information-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  entryComponents: [ InformationDetailsComponent ],
  declarations: [RequestsValidateInformationComponent, InformationDetailsComponent],
  imports: [
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    NbButtonModule,
    CommonModule,
    NbAlertModule,
    RequestsValidateInformationRoutingModule,
    NbDialogModule.forChild()
  ]
})
export class RequestsValidateInformationModule { }
