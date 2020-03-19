import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';
import { NbCardModule, NbAccordionModule } from '@nebular/theme';
import { ActivityBoardComponent } from './activity-board/activity-board.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpecialToggleComponent } from './special-toggle/special-toggle.component';


@NgModule({
  declarations: [
    AdminLapsesComponent,
    ActivityBoardComponent,
    SpecialToggleComponent
  ],
  entryComponents: [
    SpecialToggleComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    AdminLapsesRoutingModule,
    NbAccordionModule,
    NbCardModule,
    Ng2SmartTableModule,

    // Call custom module

  ]
})
export class AdminLapsesModule { }
