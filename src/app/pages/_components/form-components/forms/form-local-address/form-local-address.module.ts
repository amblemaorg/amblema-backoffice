import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLocalAddressComponent } from './form-local-address.component';
import { FormModule } from 'src/app/pages/user/_shared/components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormLocalAddressComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [FormLocalAddressComponent]
})
export class FormLocalAddressModule { }
