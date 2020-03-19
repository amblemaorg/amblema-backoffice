import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegionalAddressComponent } from './form-regional-address.component';
import { ReactiveInputModule } from '../../reactive-input/reactive-input.module';
import { ReactiveSelectModule } from '../../reactive-select/reactive-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbIconModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  exports: [
    FormRegionalAddressComponent
  ],
  declarations: [
    FormRegionalAddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    FormsModule,
    ReactiveFormsModule,

    NbIconModule,
    NbTooltipModule,
  ],
})
export class FormRegionalAddressModule { }

