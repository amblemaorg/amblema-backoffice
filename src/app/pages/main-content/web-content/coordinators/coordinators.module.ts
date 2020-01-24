import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorsRoutingModule } from './coordinators-routing.module';
import { NbCardModule } from '@nebular/theme';
import { CoordinatorsComponent } from './coordinators.component';
import { HelperModule } from '../_helpers/helper.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';


@NgModule({
  declarations: [
    CoordinatorsComponent
  ],
  imports: [
    CommonModule,
    CoordinatorsRoutingModule,
    NbCardModule,
    HelperModule,
    FormComponentModule,
    ReactiveInputFileModule
  ]
})
export class CoordinatorsModule { }
