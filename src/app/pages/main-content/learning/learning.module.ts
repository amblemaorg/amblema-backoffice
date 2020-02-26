import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { NbCardModule, NbStepperModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule } from '@nebular/theme';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { GeneralMediaFormComponent } from './forms/general-media-form/general-media-form.component';
import { SecondaryFormComponent } from './forms/secondary-form/secondary-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { SecondaryMediaFormComponent } from './forms/secondary-media-form/secondary-media-form.component';
import { QuizzFormComponent } from './forms/quizz-form/quizz-form.component';
import { ReactiveTextAreaModule } from '../../components/form-components/reactive-text-area/reactive-text-area.module';
import { ModalStepperModule } from '../../components/shared/modal/modal-stepper/modal-stepper.module';
import { ReactiveInputModule } from '../../components/form-components/reactive-input/reactive-input.module';
import { FormSliderModule } from '../../components/form-components/forms/form-slider/form-slider.module';
import { ReactiveInputFileModule } from '../../components/form-components/reactive-input-file/reactive-input-file.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormVideoModule } from '../../components/form-components/forms/form-video/form-video.module';

@NgModule({
  declarations: [
    LearningComponent,
    LearningTableComponent,
    StepperContentComponent,
    GeneralFormComponent,
    GeneralMediaFormComponent,
    SecondaryFormComponent,
    SecondaryMediaFormComponent,
    QuizzFormComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbIconModule,
    NgxMaskModule.forRoot(),
    NbInputModule,
    NbRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,

    // Add custom module
    ReactiveTextAreaModule,
    ReactiveInputModule,
    ReactiveInputFileModule,
    FormSliderModule,
    FormVideoModule,
    ModalStepperModule,
  ]
})
export class LearningModule { }
