import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LapseRoutingModule } from './lapse-routing.module';
import { LapseComponent } from './lapse.component';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [LapseComponent],
  imports: [
    CommonModule,
    LapseRoutingModule,
    FormComponentModule,
    NbCardModule
  ]
})
export class LapseModule { }
