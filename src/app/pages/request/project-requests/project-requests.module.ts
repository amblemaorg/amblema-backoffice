import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestsRoutingModule } from './project-requests-routing.module';
import { ProjectRequestsComponent } from './project-requests.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [ProjectRequestsComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    ProjectRequestsRoutingModule,
  ]
})
export class ProjectRequestsModule { }
