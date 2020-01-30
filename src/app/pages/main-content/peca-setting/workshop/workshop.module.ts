import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import { NbCardModule } from '@nebular/theme';
import { FormComponentModule } from 'src/app/pages/components/form-components/form-component.module';

@NgModule({
  declarations: [WorkshopComponent],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    NbCardModule,
    FormComponentModule
  ]
})
export class WorkshopModule { }
