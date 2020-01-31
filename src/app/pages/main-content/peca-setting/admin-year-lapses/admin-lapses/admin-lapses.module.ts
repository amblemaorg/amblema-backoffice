import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';


@NgModule({
  declarations: [AdminLapsesComponent],
  imports: [
    CommonModule,
    AdminLapsesRoutingModule
  ]
})
export class AdminLapsesModule { }
