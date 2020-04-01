import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { NbProgressBarModule, NbAlertModule } from '@nebular/theme';

@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    NbProgressBarModule,
    NbAlertModule,
  ],
  exports: [
    ProgressComponent
  ]
})
export class ProgressModule { }
