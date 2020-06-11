import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminYearRoutingModule } from './admin-year-routing.module';
import { AdminYearComponent } from './admin-year.component';
import { NbCardModule, NbListModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { SchoolBoardComponent } from './school-board/school-board.component';
import { SchoolAdminComponent } from './school-admin/school-admin.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminYearComponent, SchoolBoardComponent, SchoolAdminComponent],
  imports: [
    CommonModule,
    AdminYearRoutingModule,
    NbCardModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NbAlertModule,
    NbListModule,
    NbButtonModule,
    Ng2SmartTableModule
  ]
})
export class AdminYearModule { }
