import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveValidationComponent } from './reactive-validation.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ReactiveValidationComponent
  ],
  declarations: [
    ReactiveValidationComponent
  ],
})
export class ReactiveValidationModule { }
