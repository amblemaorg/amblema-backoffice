import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLocalAddressComponent } from './form-local-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbButtonModule, NbIconModule, NbInputModule, NbTooltipModule } from '@nebular/theme';
import { ReactiveInputModule } from '../../reactive-input/reactive-input.module';

@NgModule({
  declarations: [
    FormLocalAddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule
  ],
  exports: [FormLocalAddressComponent]
})
export class FormLocalAddressModule { }
