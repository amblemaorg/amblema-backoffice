import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormFileStepModule } from 'src/app/pages/_components/form-components/forms/form-step/form-file-step/form-file-step.module';

@NgModule({
  declarations: [WorkshopComponent],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    NbCardModule,
    NbButtonModule,

    // Add custom module
    FormFileStepModule
  ]
})
export class WorkshopModule { }
