import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConventionRoutingModule } from './convention-routing.module';
import { ConventionComponent } from './convention.component';
import { NbCardModule } from '@nebular/theme';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';

@NgModule({
  declarations: [ConventionComponent],
  imports: [
    CommonModule,
    ConventionRoutingModule,
    NbCardModule,
    FormComponentModule
  ]
})
export class ConventionModule { }
