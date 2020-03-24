import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';
import { NbCardModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { ActivityBoardComponent } from './activity-board/activity-board.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpecialToggleComponent } from './special-toggle/special-toggle.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';


@NgModule({
  declarations: [
    AdminLapsesComponent,
    ActivityBoardComponent,
    SpecialToggleComponent,
    ActivitiesFormComponent
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
    NbButtonModule,

    ModalModule,
    // Call custom module

  ]
})
export class AdminLapsesModule { }
