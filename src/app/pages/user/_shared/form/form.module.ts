import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityCardComponent } from './identity-card/identity-card.component';
import { ReactiveInputModule } from '../reactive-input/reactive-input.module';
import { NbInputModule, NbTooltipModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IdentityCardComponent],
  imports: [
    NbInputModule,
    ReactiveFormsModule,
    NbTooltipModule,
    CommonModule,
    ReactiveInputModule,
  ],
  exports: [IdentityCardComponent],
})
export class FormModule {}
