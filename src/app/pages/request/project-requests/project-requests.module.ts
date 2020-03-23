import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRequestsRoutingModule } from './project-requests-routing.module';
import { ProjectRequestsComponent } from './project-requests.component';


@NgModule({
  declarations: [ProjectRequestsComponent],
  imports: [
    CommonModule,
    ProjectRequestsRoutingModule
  ]
})
export class ProjectRequestsModule { }
