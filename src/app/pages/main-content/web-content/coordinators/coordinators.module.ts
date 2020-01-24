import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsRoutingModule } from './coordinators-routing.module';
import { NbCardModule } from '@nebular/theme';
import { CoordinatorsComponent } from './coordinators.component';
import { HelperModule } from '../_helpers/helper.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { SharedFormsModule } from 'src/app/pages/components/form-components/shared-forms.module';


@NgModule({
  declarations: [
    CoordinatorsComponent
  ],
  imports: [
    CommonModule,
    CoordinatorsRoutingModule,
    NbCardModule,
    HelperModule,
    SharedFormsModule,
    ReactiveInputFileModule
  ]
})
export class CoordinatorsModule { }
