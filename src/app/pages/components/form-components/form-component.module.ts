import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule, NbIconModule } from '@nebular/theme';

import { FormSliderComponent } from './shared-form/form-slider/form-slider.component';
import { ReactiveInputFileModule } from './reactive-input-file/reactive-input-file.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormSimpleStepComponent } from './shared-form/form-step/form-simple-step/form-simple-step.component';
import { FormFileStepComponent } from './shared-form/form-step/form-file-step/form-file-step.component';
import { SharedComponentsModule } from '../shared-components.module';
import { ReactiveInputModule } from './reactive-input/reactive-input.module';
import { ReactiveValidationModule } from './reactive-validation/reactive-validation.module';
import { ReactiveSelectModule } from './reactive-select/reactive-select.module';
import { ReactiveTextAreaModule } from './reactive-text-area/reactive-text-area.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    ReactiveInputFileModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    NbIconModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ReactiveValidationModule, 
    ReactiveTextAreaModule
  ],
  declarations: [

    // Forms
    FormSliderComponent,
    FormSimpleStepComponent,
    FormFileStepComponent,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,

    // Forms
    FormSliderComponent,
    FormSimpleStepComponent,
    FormFileStepComponent,
    FormSimpleStepComponent,
    FormFileStepComponent,

  ]
})
export class FormComponentModule { }
