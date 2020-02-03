import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';
import { NbCardModule, NbAccordionModule } from '@nebular/theme';
import { ActivityBoardComponent } from './activity-board/activity-board.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { ToggleComponent } from 'src/app/pages/components/shared/toggle/toggle.component';


@NgModule({
  declarations: [AdminLapsesComponent, ActivityBoardComponent],
  entryComponents: [ToggleComponent],
  imports: [
    CommonModule,
    NbCardModule,
    AdminLapsesRoutingModule,
    NbAccordionModule,
    NbCardModule,
    Ng2SmartTableModule,
    SharedComponentsModule
  ]
})
export class AdminLapsesModule { }
