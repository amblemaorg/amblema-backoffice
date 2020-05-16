import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherReportRoutingModule } from './teacher-report-routing.module';
import { TeacherReportComponent } from './teacher-report.component';
import { NbCardModule, NbSpinnerModule, NbRadioModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TeacherReportComponent],
  imports: [
    CommonModule,
    TeacherReportRoutingModule,
    NbCardModule, 
    NbSpinnerModule,
    NbRadioModule, 
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TeacherReportModule { }
