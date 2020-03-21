import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';

@NgModule({
  declarations: [
    StepsFormModule
  ],
  imports: [
    CommonModule,
    ReactiveInputModule
  ], 
  exports: [StepsFormModule]
})
export class StepsFormModule { }
