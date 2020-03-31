import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { StepsFormComponent } from './steps-form.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { NbCheckboxModule, NbRadioModule, NbIconModule, NbListModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveDatepickerModule } from 'src/app/pages/components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';

@NgModule({
  declarations: [
    StepsFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ModalModule,
    NbRadioModule,
    NbCheckboxModule,
    NbAlertModule,
    ReactiveFormsModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
    NbIconModule,
    NbListModule,
    ReactiveDatepickerModule,
    NbButtonModule,

  ],
  exports: [StepsFormComponent]
})
export class StepsFormModule { }
