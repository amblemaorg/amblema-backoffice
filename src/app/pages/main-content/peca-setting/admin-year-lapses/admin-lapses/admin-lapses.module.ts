import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';
import { NbCardModule, NbAccordionModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { ActivityBoardComponent } from './activity-board/activity-board.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpecialToggleComponent } from './special-toggle/special-toggle.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';


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
    ReactiveInputModule,
    Ng2SmartTableModule,
    NbButtonModule,
    ReactiveTextAreaModule,
    NbCheckboxModule,
    ReactiveFormsModule,

    ModalModule,
    // Call custom module

  ]
})
export class AdminLapsesModule { }
