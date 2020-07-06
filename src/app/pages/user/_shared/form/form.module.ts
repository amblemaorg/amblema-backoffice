import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityCardComponent } from './identity-card/identity-card.component';
import { ReactiveInputModule } from '../reactive-input/reactive-input.module';
import {
  NbInputModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbButtonModule,
  NbIconModule,
} from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [IdentityCardComponent, AddressFormComponent],
  imports: [
    NbInputModule,
    ReactiveFormsModule,
    FormsModule,
    NbTooltipModule,
    NbButtonModule,

    NbIconModule,
    CommonModule,
    NbSpinnerModule,
    NgSelectModule,
    ReactiveInputModule,
  ],
  exports: [IdentityCardComponent, AddressFormComponent],
})
export class FormModule {}
