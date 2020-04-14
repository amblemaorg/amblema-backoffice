import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LapseRoutingModule } from './lapse-routing.module';
import { LapseComponent } from './lapse.component';
import {
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAlertModule,
    NbIconModule } from '@nebular/theme';
import {
  FormSimpleStepModule
} from 'src/app/pages/components/form-components/forms/form-step/form-simple-step/form-simple-step.module';
import { FormFileStepModule } from 'src/app/pages/components/form-components/forms/form-step/form-file-step/form-file-step.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ToggleModule } from 'src/app/pages/components/shared/toggle/toggle.module';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormSliderModule } from 'src/app/pages/components/form-components/forms/form-slider/form-slider.module';
import { SliderStandardComponent } from './slider-standard/slider-standard.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [LapseComponent, ActivityFormComponent, SliderStandardComponent],
  imports: [
    CommonModule,
    LapseRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom module
    FormSimpleStepModule,
    ToggleModule,
    NbListModule,
    ReactiveInputModule,
    ReactiveTextAreaModule,
    NbAlertModule,
    ReactiveInputFileModule,
    Ng2SmartTableModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    FormFileStepModule,
    FormSliderModule
  ]
})
export class LapseModule { }
