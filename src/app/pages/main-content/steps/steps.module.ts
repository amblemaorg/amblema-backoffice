import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { ModalModule } from '../../components/shared/modal/modal-forms/modal.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveTextAreaModule } from '../../components/form-components/reactive-text-area/reactive-text-area.module';
import { ProgressModule } from '../../components/shared/progress/progress.module';

@NgModule({
  declarations: [
    StepsComponent,
  ],
  imports: [
    CommonModule,
    StepsRoutingModule,
    ReactiveFormsModule,
    ReactiveTextAreaModule,
    ReactiveInputModule,
    ModalModule,
  ],
})
export class StepsModule { }
