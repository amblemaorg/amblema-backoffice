import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule, NbIconModule } from '@nebular/theme';

import { ReactiveInputFileModule } from './reactive-input-file/reactive-input-file.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from '../shared-components.module';
import { ReactiveInputModule } from './reactive-input/reactive-input.module';
import { ReactiveValidationModule } from './reactive-validation/reactive-validation.module';
import { ReactiveSelectModule } from './reactive-select/reactive-select.module';
import { ReactiveTextAreaModule } from './reactive-text-area/reactive-text-area.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    ReactiveInputFileModule,
    Ng2SmartTableModule,
    SharedComponentsModule,
    NbIconModule,
    ReactiveInputModule,
    ReactiveSelectModule,
    ReactiveValidationModule,
    ReactiveTextAreaModule
  ],
  declarations: [

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FormComponentModule { }
