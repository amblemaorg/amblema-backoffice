import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule, NbIconModule } from '@nebular/theme';

// Text Area
import { TextAreaDescriptionComponent } from './reactive-text-area/text-area-description';
import { TextAreaAboutComponent } from './reactive-text-area/text-area-about';
import { TextAreaEnviromentComponent } from './reactive-text-area/text-area-enviroment';
import { TextAreaMathComponent } from './reactive-text-area/text-area-math';
import { TextAreaReadingComponent } from './reactive-text-area/text-area-reading';
import { TextAreaCustomComponent } from './reactive-text-area/text-area-custom';

import { FormSliderComponent } from './shared-form/form-slider/form-slider.component';
import { ReactiveInputFileModule } from './reactive-input-file/reactive-input-file.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormSimpleStepComponent } from './shared-form/form-step/form-simple-step/form-simple-step.component';
import { FormFileStepComponent } from './shared-form/form-step/form-file-step/form-file-step.component';
import { SharedComponentsModule } from '../shared-components.module';
import { ReactiveInputModule } from './reactive-input/reactive-input.module';
import { ReactiveValidationModule } from './reactive-validation/reactive-validation.module';
import { ReactiveSelectModule } from './reactive-select/reactive-select.module';

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
    ReactiveValidationModule
  ],
  declarations: [

    // Forms
    FormSliderComponent,
    FormSimpleStepComponent,
    FormFileStepComponent,

    // Text area
    TextAreaDescriptionComponent,
    TextAreaAboutComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent,
    TextAreaCustomComponent,
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

    // Text area
    TextAreaDescriptionComponent,
    TextAreaAboutComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent,
    TextAreaCustomComponent
  ]
})
export class FormComponentModule { }
