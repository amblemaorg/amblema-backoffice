import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SponsorsComponent } from './sponsors.component';
import { NbCardModule, NbButtonModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { ReactiveInputFileModule } from 'src/app/pages/_components/form-components/reactive-input-file/reactive-input-file.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveTextAreaModule } from 'src/app/pages/_components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputModule } from 'src/app/pages/_components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from 'src/app/pages/_components/form-components/reactive-select/reactive-select.module';
import { ProgressModule } from 'src/app/pages/_components/shared/progress/progress.module';

@NgModule({
  declarations: [
    SponsorsComponent,
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    NbCardModule,
    HelperModule,
    Ng2SmartTableModule,
    ReactiveInputFileModule,
    NbButtonModule,

    // Add custom module
    ReactiveTextAreaModule,
    ReactiveInputModule,
    ProgressModule,
    NbSpinnerModule,
    
    ReactiveInputFileModule,
    ReactiveSelectModule,
    NbAlertModule
  ]
})
export class SponsorsModule { }
