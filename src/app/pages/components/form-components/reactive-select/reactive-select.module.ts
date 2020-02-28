import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRoleComponent } from './select-role.component';
import { SelectStatusComponent } from './select-status.component';
import { SelectTypeComponent } from './select-type.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectSexComponent } from './select-sex.component';
import { SelectTagComponent } from './select-tag.component';
import { SelectPostStatusComponent } from './select-post-status.component';

@NgModule({
  declarations: [
    SelectRoleComponent,
    SelectStatusComponent,
    SelectTypeComponent,
    SelectSexComponent,
    SelectTagComponent,
    SelectPostStatusComponent,
  ],
  exports: [
    SelectRoleComponent,
    SelectStatusComponent,
    SelectTypeComponent,
    SelectSexComponent, 
    SelectTagComponent,
    SelectPostStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveValidationModule,
  ]
})
export class ReactiveSelectModule { }
