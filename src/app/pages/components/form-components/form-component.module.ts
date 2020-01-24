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

import { TextAreaDescriptionComponent } from './reactive-text-area/text-area-description';
import { TextAreaAboutComponent } from './reactive-text-area/text-area-about';
import { TextAreaEnviromentComponent } from './reactive-text-area/text-area-enviroment';
import { TextAreaMathComponent } from './reactive-text-area/text-area-math';
import { TextAreaReadingComponent } from './reactive-text-area/text-area-reading';
import { InputCustomComponent } from './reactive-form-components/input-custom';
import { TextAreaCustomComponent } from './reactive-text-area/text-area-custom';

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

    // Input
    InputCustomComponent,

    // Text area
    TextAreaDescriptionComponent,
    TextAreaAboutComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent,
    TextAreaCustomComponent,
  ],
  exports: [
    ReactiveInputComponent,
    ReactiveValidationComponent,
    IdDocumentComponent,
    RoleSelectorComponent,
    StatusSelectorComponent,
    ReactiveFormsModule,
    FormsModule,
    RoleSelectorNormalComponent,

    // Input
    InputCustomComponent,

    // Text area
    TextAreaDescriptionComponent,
    TextAreaAboutComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent,
    TextAreaCustomComponent
  ]
})
export class FormComponentModule { }
