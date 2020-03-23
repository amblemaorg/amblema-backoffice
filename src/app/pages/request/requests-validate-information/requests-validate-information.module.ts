import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsValidateInformationRoutingModule } from './requests-validate-information-routing.module';
import { RequestsValidateInformationComponent } from './requests-validate-information.component';


@NgModule({
  declarations: [RequestsValidateInformationComponent],
  imports: [
    CommonModule,
    RequestsValidateInformationRoutingModule
  ]
})
export class RequestsValidateInformationModule { }
