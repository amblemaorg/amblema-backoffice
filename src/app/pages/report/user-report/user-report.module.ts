import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReportRoutingModule } from './user-report-routing.module';
import { UserReportComponent } from './user-report.component';
import { NbCardModule, NbIconModule, NbButtonModule, NbRadioModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserReportComponent],
  imports: [
    CommonModule,
    UserReportRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    NbRadioModule,
    FormsModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class UserReportModule { }
