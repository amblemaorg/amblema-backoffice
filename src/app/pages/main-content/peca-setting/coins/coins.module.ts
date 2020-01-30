import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { NbCardModule } from '@nebular/theme';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';

@NgModule({
  declarations: [CoinsComponent],
  imports: [
    CommonModule,
    CoinsRoutingModule,
    NbCardModule,
    FormComponentModule
  ]
})
export class CoinsModule { }
