import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { NbCardModule, NbStepperModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbButtonModule } from '@nebular/theme';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { GeneralMediaFormComponent } from './forms/general-media-form/general-media-form.component';
import { SecondaryFormComponent } from './forms/secondary-form/secondary-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { SecondaryMediaFormComponent } from './forms/secondary-media-form/secondary-media-form.component';
import { QuizzFormComponent } from './forms/quizz-form/quizz-form.component';
import { ReactiveTextAreaModule } from '../../_components/form-components/reactive-text-area/reactive-text-area.module';
import { ModalStepperModule } from '../../_components/shared/modal/modal-stepper/modal-stepper.module';
import { ReactiveInputModule } from '../../_components/form-components/reactive-input/reactive-input.module';
import { FormSliderModule } from '../../_components/form-components/forms/form-slider/form-slider.module';
import { ReactiveInputFileModule } from '../../_components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormVideoModule } from '../../_components/form-components/forms/form-video/form-video.module';
import { ViewLearningComponent } from './view-learning/view-learning.component';
import { ModalModule } from '../../_components/shared/modal/modal-forms/modal.module';
import { DropdownPriorityComponent } from './dropdown-priority/dropdown-priority.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressModule } from '../../_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    LearningComponent,
    LearningTableComponent,
    StepperContentComponent,
    GeneralFormComponent,
    GeneralMediaFormComponent,
    SecondaryFormComponent,
    SecondaryMediaFormComponent,
    QuizzFormComponent,
    ViewLearningComponent,
    DropdownPriorityComponent
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
    ModalModule,
    ReactiveFormsModule,
    NbListModule,
    NbInputModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NbButtonModule,
    ProgressModule,
    FormsModule,

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
