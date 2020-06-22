import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSimpleStepComponent } from './form-simple-step.component';
import { ReactiveTextAreaModule } from '../../../reactive-text-area/reactive-text-area.module';
import { NbIconModule, NbButtonModule, NbListModule, NbAlertModule, NbSpinnerModule } from '@nebular/theme';
import { ToggleModule } from 'src/app/pages/_components/shared/toggle/toggle.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveInputModule } from '../../../reactive-input/reactive-input.module';
import { ReactiveInputFileModule } from '../../../reactive-input-file/reactive-input-file.module';
import { ProgressModule } from 'src/app/pages/_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    FormSimpleStepComponent,
  ],
  exports: [
    FormSimpleStepComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveTextAreaModule,
    ReactiveInputModule,
    NbSpinnerModule,
    ProgressModule,
    ReactiveInputFileModule,
    NbListModule,
    NbAlertModule,
    NbIconModule,
    NbButtonModule,
    ToggleModule
  ]
})
export class FormSimpleStepModule { }
