import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveInputComponent } from './form-backup/reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from './reactive-validation/reactive-validation.component';
import { IdDocumentComponent } from './form-backup/reactive-form-components/id-document/id-document.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { RoleSelectorComponent } from './form-backup/role-selector/role-selector.component';
import { StatusSelectorComponent } from './form-backup/status-selector/status-selector.component';
import { RoleSelectorNormalComponent } from './form-backup/role-selector/role.selector.normal.component';

// Text Area
import { TextAreaDescriptionComponent } from './reactive-text-area/text-area-description';
import { TextAreaAboutComponent } from './reactive-text-area/text-area-about';
import { TextAreaEnviromentComponent } from './reactive-text-area/text-area-enviroment';
import { TextAreaMathComponent } from './reactive-text-area/text-area-math';
import { TextAreaReadingComponent } from './reactive-text-area/text-area-reading';
import { TextAreaCustomComponent } from './reactive-text-area/text-area-custom';

// Inputs
import { InputNameComponent } from './reactive-input/input-name.component';
import { InputLastNameComponent } from './reactive-input/input-last-name.component';
import { InputCostumeComponent } from './reactive-input/input-costume.component';
import { InputPositionComponent } from './reactive-input/input-position.component';

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
    InputNameComponent,
    InputLastNameComponent,
    InputPositionComponent,
    InputCostumeComponent,

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
    InputNameComponent,
    InputLastNameComponent,
    InputPositionComponent,
    InputCostumeComponent,

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
