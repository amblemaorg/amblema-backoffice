import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { NbCardModule, NbStepperModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { FormComponentModule } from '../../components/form-components/form-component.module';
import { GeneralMediaFormComponent } from './forms/general-media-form/general-media-form.component';
import { SecondaryFormComponent } from './forms/secondary-form/secondary-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { SecondaryMediaFormComponent } from './forms/secondary-media-form/secondary-media-form.component';
import { QuizzFormComponent } from './forms/quizz-form/quizz-form.component';

@NgModule({
  declarations: [
    LearningComponent,
    LearningTableComponent,
    StepperContentComponent,
    GeneralFormComponent,
    GeneralMediaFormComponent,
    SecondaryFormComponent,
    SecondaryMediaFormComponent,
    QuizzFormComponent],
  imports: [
    CommonModule,
    LearningRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    NbStepperModule,
    NbIconModule,
    FormComponentModule,
    NgxMaskModule.forRoot(),
    NbInputModule
  ]
})
export class LearningModule { }
