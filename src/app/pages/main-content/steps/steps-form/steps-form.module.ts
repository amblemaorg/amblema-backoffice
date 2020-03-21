import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { StepsFormComponent } from './steps-form.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { NbCheckboxModule, NbRadioModule } from '@nebular/theme';

@NgModule({
  declarations: [
    StepsFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ModalModule,
    NbRadioModule,
    NbCheckboxModule
  ],
  exports: [StepsFormComponent]
})
export class StepsFormModule { }
