import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentalProjectRoutingModule } from './environmental-project-routing.module';
import { MainFormComponent } from './main-form/main-form.component';
import { LapseFormComponent } from './lapse-form/lapse-form.component';
import { ObjectiveFormComponent } from './objective-form/objective-form.component';
import { TopicsFormComponent } from './topics-form/topics-form.component';
import { EnvironmentalProjectComponent } from './environmental-project.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [MainFormComponent, LapseFormComponent, ObjectiveFormComponent, TopicsFormComponent, EnvironmentalProjectComponent],
  imports: [
    CommonModule,
    NbCardModule,
    EnvironmentalProjectRoutingModule
  ]
})
export class EnvironmentalProjectModule { }
