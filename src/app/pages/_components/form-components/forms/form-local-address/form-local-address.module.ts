import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLocalAddressComponent } from './form-local-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormLocalAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [FormLocalAddressComponent]
})
export class FormLocalAddressModule { }
