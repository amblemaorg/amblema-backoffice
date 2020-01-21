import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputComponent } from './reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from './reactive-form-components/reactive-validation/reactive-validation.component';
import { IdDocumentComponent } from './reactive-form-components/id-document/id-document.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { StatusSelectorComponent } from './status-selector/status-selector.component';
import { RoleSelectorNormalComponent } from './role-selector/role.selector.normal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule
  ],
  declarations: [
    ReactiveInputComponent,
    ReactiveValidationComponent,
    IdDocumentComponent,
    RoleSelectorComponent,
    StatusSelectorComponent,
    RoleSelectorNormalComponent,
  ],
  exports: [
    ReactiveInputComponent,
    ReactiveValidationComponent,
    IdDocumentComponent,
    RoleSelectorComponent,
    StatusSelectorComponent,
    ReactiveFormsModule,
    FormsModule,
    RoleSelectorNormalComponent
  ]
})
export class SharedFormsModule { }
