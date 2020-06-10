import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLapsesRoutingModule } from './admin-lapses-routing.module';
import { AdminLapsesComponent } from './admin-lapses.component';
import {
  NbCardModule,
  NbAccordionModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbListModule,
  NbAlertModule,
  NbSpinnerModule} from '@nebular/theme';
import { ActivityBoardComponent } from './activity-board/activity-board.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SpecialToggleComponent } from './special-toggle/special-toggle.component';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ReactiveDatepickerModule } from 'src/app/pages/components/form-components/reactive-datepicker/reactive-datepicker.module';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { ProgressModule } from 'src/app/pages/components/shared/progress/progress.module';


@NgModule({
  declarations: [
    AdminLapsesComponent,
    ActivityBoardComponent,
    SpecialToggleComponent,
    ActivitiesFormComponent,
    ButtonDeleteComponent
  ],
  entryComponents: [
    SpecialToggleComponent,
    ButtonDeleteComponent,
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
    ReactiveInputModule,
    ProgressModule,
    NbSpinnerModule,
    NbIconModule,
    ReactiveDatepickerModule,
    NbListModule,
    ReactiveInputFileModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    NbAlertModule,
    ModalModule,
    ProgressModule,
  ]
})
export class AdminLapsesModule { }
