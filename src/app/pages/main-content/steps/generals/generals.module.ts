import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralsRoutingModule } from './generals-routing.module';
import { GeneralsComponent } from './generals.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { HelpersModule } from '../_helpers/helpers.module';

@NgModule({
  declarations: [GeneralsComponent],
  imports: [
    CommonModule,
    GeneralsRoutingModule,
    NbCardModule,
    NbIconModule,
    HelpersModule
  ]
})
export class GeneralsModule { }
