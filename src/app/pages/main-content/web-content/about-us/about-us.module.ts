import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule } from '@nebular/theme';
import { AboutUsComponent } from './about-us.component';
import { HelperModule } from '../_helpers/helper.module';
import { AboutFormComponent } from './about-form/about-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveSelectModule } from 'src/app/pages/components/form-components/reactive-select/reactive-select.module';

@NgModule({
  declarations: [
    AboutUsComponent,
    AboutFormComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    NbCardModule,
    HelperModule,
    Ng2SmartTableModule,

    // Add custom module
    ReactiveTextAreaModule,
    ReactiveInputModule,
    ReactiveInputFileModule,
    ReactiveSelectModule
  ]
})
export class AboutUsModule { }
