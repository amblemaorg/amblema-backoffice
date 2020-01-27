import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralsRoutingModule } from './generals-routing.module';
import { GeneralsComponent } from './generals.component';


@NgModule({
  declarations: [GeneralsComponent],
  imports: [
    CommonModule,
    GeneralsRoutingModule
  ]
})
export class GeneralsModule { }
