import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegionaladdressComponent } from './form-regional-address.component';
import { ReactiveInputModule } from '../../reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../reactive-select/reactive-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbIconModule, NbTooltipModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  exports: [
    FormRegionaladdressComponent
  ],
  declarations: [
    FormRegionaladdressComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    FormsModule,
    ReactiveFormsModule,

    NbIconModule,
    NbTooltipModule,
    NbButtonModule
  ],
})
export class FormRegionaladdressModule { }
