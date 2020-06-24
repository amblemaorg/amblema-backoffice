import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConventionRoutingModule } from './convention-routing.module';
import { ConventionComponent } from './convention.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ReactiveTextAreaModule } from 'src/app/pages/_components/form-components/reactive-text-area/reactive-text-area.module';

@NgModule({
  declarations: [ConventionComponent],
  imports: [
    CommonModule,
    ConventionRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom module
    ReactiveTextAreaModule,
  ]
})
export class ConventionModule { }
