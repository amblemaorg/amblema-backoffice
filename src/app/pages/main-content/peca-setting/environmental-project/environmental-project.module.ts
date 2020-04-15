import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvironmentalProjectRoutingModule } from './environmental-project-routing.module';
import { MainFormComponent } from './main-form/main-form.component';
import { ObjectiveFormComponent } from './objective-form/objective-form.component';
import { TopicsFormComponent } from './topics-form/topics-form.component';
import { EnvironmentalProjectComponent } from './environmental-project.component';
import { NbCardModule, NbRadioModule, NbAlertModule, NbIconModule, NbButtonModule, NbListModule, NbAccordionModule } from '@nebular/theme';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemsComponent } from './list-items/list-items.component';
import { FormComponent } from './topics-form/form/form.component';


@NgModule({
  declarations: [MainFormComponent, ObjectiveFormComponent, TopicsFormComponent, EnvironmentalProjectComponent, ListItemsComponent, FormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    ReactiveInputModule,
    NbRadioModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbAccordionModule,
    NbListModule,
    NbIconModule,
    EnvironmentalProjectRoutingModule
  ]
})
export class EnvironmentalProjectModule { }
