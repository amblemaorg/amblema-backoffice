import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReportRoutingModule } from './user-report-routing.module';
import { UserReportComponent } from './user-report.component';
import { NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserReportComponent],
  imports: [
    CommonModule,
    UserReportRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserReportModule { }
