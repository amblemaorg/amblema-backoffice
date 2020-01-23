import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { PillarsComponent } from './pillars/pillars.component';
import { FoundersFormComponent } from './founders-form/founders-form.component';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { FoundersTableComponent } from './founders-table/founders-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputFileModule } from 'src/app/pages/forms/reactive-input-file/reactive-input-file.module';

@NgModule({
  declarations: [
    HomeComponent,
    PillarsComponent,
    FoundersFormComponent,
    FoundersTableComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    HelperModule,
    ReactiveInputFileModule,
    SharedFormsModule,
    Ng2SmartTableModule
  ]
})
export class HomeModule { }
