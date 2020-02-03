import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRoleComponent } from './select-role.component';
import { SelectStatusComponent } from './select-status.component';
import { SelectTypeComponent } from './select-type.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectRoleComponent,
    SelectStatusComponent,
    SelectTypeComponent
  ],
  exports: [
    SelectRoleComponent,
    SelectStatusComponent,
    SelectTypeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveValidationModule,
  ]
})
export class ReactiveSelectModule { }
