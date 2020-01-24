import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { SharedFormsModule } from 'src/app/pages/components/form-components/shared-forms.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    HelperModule,
    ReactiveInputFileModule,
    SharedFormsModule,
    Ng2SmartTableModule
  ]
})
export class HomeModule { }
