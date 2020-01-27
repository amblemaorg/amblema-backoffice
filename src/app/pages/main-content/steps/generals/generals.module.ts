import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralsRoutingModule } from './generals-routing.module';
import { GeneralsComponent } from './generals.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';

@NgModule({
  declarations: [GeneralsComponent],
  imports: [
    CommonModule,
    GeneralsRoutingModule, 
    NbCardModule,
    FormComponentModule,
    NbIconModule,
    SharedComponentsModule,
  ]
})
export class GeneralsModule { }
