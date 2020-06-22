import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputModule } from 'src/app/pages/_components/form-components/reactive-input/reactive-input.module';
import { StepsFormComponent } from './steps-form.component';
import { ModalModule } from 'src/app/pages/_components/shared/modal/modal-forms/modal.module';
import {
  NbCheckboxModule
  , NbRadioModule
  , NbIconModule
  , NbListModule
  , NbButtonModule
  , NbAlertModule
  , NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveTextAreaModule } from 'src/app/pages/_components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveDatepickerModule } from 'src/app/pages/_components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ReactiveInputFileModule } from 'src/app/pages/_components/form-components/reactive-input-file/reactive-input-file.module';
import { ProgressModule } from 'src/app/pages/_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    StepsFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ModalModule,
    ProgressModule,
    NbRadioModule,
    NbCheckboxModule,
    NbAlertModule,
    ReactiveFormsModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
    NbIconModule,
    NbListModule,
    ReactiveDatepickerModule,
    NbSpinnerModule,
    NbButtonModule,

  ],
  exports: [StepsFormComponent]
})
export class StepsFormModule { }
