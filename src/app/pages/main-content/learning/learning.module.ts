import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { LearningComponent } from './learning.component';
import { NbCardModule } from '@nebular/theme';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../../components/shared-components.module';


@NgModule({
  declarations: [LearningComponent, LearningTableComponent],
  imports: [
    CommonModule,
    LearningRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule
  ]
})
export class LearningModule { }
