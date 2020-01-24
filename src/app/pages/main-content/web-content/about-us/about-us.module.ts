import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { NbCardModule } from '@nebular/theme';
import { AboutUsComponent } from './about-us.component';
import { HelperModule } from '../_helpers/helper.module';
import { AboutFormComponent } from './about-form/about-form.component';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { SharedFormsModule } from 'src/app/pages/components/form-components/shared-forms.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    ReactiveInputFileModule,
    SharedFormsModule,
    Ng2SmartTableModule
  ]
})
export class AboutUsModule { }
