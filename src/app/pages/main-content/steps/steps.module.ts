import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';

@NgModule({
  declarations: [
    StepsComponent,
  ],
  imports: [
    CommonModule,
    StepsRoutingModule, 

    ModalModule,
    ReactiveInputModule
  ], 
})
export class StepsModule { }
