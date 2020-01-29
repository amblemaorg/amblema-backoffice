import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { NbCardModule, NbStepperModule, NbIconModule } from '@nebular/theme';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { GeneralFormComponent } from './forms/general-form/general-form.component';
import { FormComponentModule } from '../../components/form-components/form-component.module';

@NgModule({
  declarations: [LearningComponent, LearningTableComponent, StepperContentComponent, GeneralFormComponent],
  imports: [
    CommonModule,
    LearningRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    NbStepperModule,
    NbIconModule,
    FormComponentModule,
  ]
})
export class LearningModule { }
