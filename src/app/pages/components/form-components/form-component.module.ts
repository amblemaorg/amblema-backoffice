import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveValidationComponent } from './reactive-validation/reactive-validation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

// Text Area
import { TextAreaDescriptionComponent } from './reactive-text-area/text-area-description';
import { TextAreaAboutComponent } from './reactive-text-area/text-area-about';
import { TextAreaEnviromentComponent } from './reactive-text-area/text-area-enviroment';
import { TextAreaMathComponent } from './reactive-text-area/text-area-math';
import { TextAreaReadingComponent } from './reactive-text-area/text-area-reading';
import { TextAreaCustomComponent } from './reactive-text-area/text-area-custom';

// Input
import { InputNameComponent } from './reactive-input/input-name.component';
import { InputLastNameComponent } from './reactive-input/input-last-name.component';
import { InputPositionComponent } from './reactive-input/input-position.component';
import { InputDocumentComponent } from './reactive-input/input-document.component';
import { InputPhoneComponent } from './reactive-input/input-phone.component';

// Select
import { SelectRoleComponent } from './reactive-select/select-role.component';
import { SelectTypeComponent } from './reactive-select/select-type.component';
import { SelectStatusComponent } from './reactive-select/select-status.component';

import { FormDocumentComponent } from './shared-form/form-document/form-document.component';
import { InputEmailComponent } from './reactive-input/input-email.component';
import { InputPasswordComponent } from './reactive-input/input-password.component';
import { FormRegionalAddressComponent } from './shared-form/form-regional-address/form-regional-address.component';
import { InputCustomComponent } from './reactive-input/input-custom.component';
import { FormSliderComponent } from './shared-form/form-slider/form-slider.component';
import { ReactiveInputFileModule } from './reactive-input-file/reactive-input-file.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    ReactiveInputFileModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ReactiveValidationComponent,

    // Forms
    FormDocumentComponent,
    FormRegionalAddressComponent,
    FormSliderComponent,

    // Input
    InputNameComponent,
    InputLastNameComponent,
    InputPositionComponent,
    InputCustomComponent,
    InputDocumentComponent,
    InputEmailComponent,
    InputPhoneComponent,
    InputPasswordComponent,

    // Select
    SelectTypeComponent,
    SelectRoleComponent,
    SelectStatusComponent,

    // Text area
    TextAreaDescriptionComponent,
    TextAreaAboutComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent,
    TextAreaCustomComponent,
  ],
  exports: [
    ReactiveValidationComponent,
    ReactiveFormsModule,
    FormsModule,

    // Forms
    FormDocumentComponent,
    FormRegionalAddressComponent,
    FormSliderComponent,

    // Input
    InputNameComponent,
    InputLastNameComponent,
    InputPositionComponent,
    InputCustomComponent,
    InputDocumentComponent,
    InputEmailComponent,
    InputPhoneComponent,
    InputPasswordComponent,

    // Select
    SelectTypeComponent,
    SelectRoleComponent,
    SelectStatusComponent,

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
