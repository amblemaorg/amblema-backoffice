import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { NbCardModule, NbRadioModule, NbAlertModule } from '@nebular/theme';
import { DiagnosticRadioComponent } from './diagnostic-radio/diagnostic-radio.component';
import { DiagnosticTableComponent } from './diagnostic-table/diagnostic-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [GoalsComponent, DiagnosticRadioComponent, DiagnosticTableComponent],
  imports: [
    CommonModule,
    NbRadioModule,
    NbAlertModule,
    Ng2SmartTableModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    GoalsRoutingModule
  ]
})
export class GoalsModule { }
