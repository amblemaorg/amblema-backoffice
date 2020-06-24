import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { AboutUsComponent } from './about-us.component';
import { HelperModule } from '../_helpers/helper.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { ReactiveTextAreaModule } from 'src/app/pages/_components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputModule } from 'src/app/pages/_components/form-components/reactive-input/reactive-input.module';
import { ReactiveInputFileModule } from 'src/app/pages/_components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveSelectModule } from 'src/app/pages/_components/form-components/reactive-select/reactive-select.module';
import { FormSliderModule } from 'src/app/pages/_components/form-components/forms/form-slider/form-slider.module';
import { ProgressModule } from 'src/app/pages/_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    NbCardModule,
    HelperModule,
    Ng2SmartTableModule,
    NbButtonModule,

    // Add custom module
    ReactiveTextAreaModule,
    ReactiveInputModule,
    ReactiveInputFileModule,
    ReactiveSelectModule,
    FormSliderModule,
    ProgressModule,
    NbSpinnerModule,
  ]
})
export class AboutUsModule { }
