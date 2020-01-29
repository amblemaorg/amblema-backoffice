import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { HelpersModule } from '../_helpers/helpers.module';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [SchoolComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    HelpersModule,
    NbCardModule
  ]
})
export class SchoolModule { }
