import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningComponent } from './learning.component';
import { LearningTableComponent } from './learning-table/learning-table.component';
import { StepperContentComponent } from './stepper-content/stepper-content.component';

const routes: Routes = [
  {
    path: '',
    component: LearningComponent,
    children: [
      {
        path: '',
        component: LearningTableComponent
      },
      {
        path: 'stepper',
        component: StepperContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
