import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsValidateInformationRoutingModule } from './requests-validate-information-routing.module';
import { RequestsValidateInformationComponent } from './requests-validate-information.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [RequestsValidateInformationComponent],
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    CommonModule,
    RequestsValidateInformationRoutingModule
  ]
})
export class RequestsValidateInformationModule { }