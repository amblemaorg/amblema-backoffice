import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';

@NgModule({
  entryComponents: [
    SchoolSettingsComponent

  ],
  declarations: [
    SchoolsComponent,

    SchoolSettingsComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    Ng2SmartTableModule,
    NbCardModule
  ]
})
export class SchoolsModule { }
