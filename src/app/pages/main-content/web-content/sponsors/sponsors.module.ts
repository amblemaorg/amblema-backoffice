import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SponsorsComponent } from './sponsors.component';
import { NbCardModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { ReactiveInputFileModule } from 'src/app/pages/forms/reactive-input-file/reactive-input-file.module';
import { SponsorFormComponent } from './sponsor-form/sponsor-form.component';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    SponsorsComponent,
    SponsorFormComponent, 
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule,
    NbCardModule,
    HelperModule,
    SharedFormsModule, 
    Ng2SmartTableModule,
    ReactiveInputFileModule,
  ]
})
export class SponsorsModule { }
