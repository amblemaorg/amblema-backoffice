import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCustomComponent } from './input-custom.component';
import { InputEmailComponent } from './input-email.component';
import { InputDocumentComponent } from './input-document.component';
import { InputLastNameComponent } from './input-last-name.component';
import { InputNameComponent } from './input-name.component';
import { InputPasswordComponent } from './input-password.component';
import { InputPhoneComponent } from './input-phone.component';
import { InputPositionComponent } from './input-position.component';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveValidationModule,
        NbInputModule
    ],
    exports: [
        InputCustomComponent,
        InputDocumentComponent,
        InputEmailComponent,
        InputLastNameComponent,
        InputNameComponent,
        InputPasswordComponent,
        InputPhoneComponent,
        InputPositionComponent,
    ],
    declarations: [
        InputCustomComponent,
        InputDocumentComponent,
        InputEmailComponent,
        InputLastNameComponent,
        InputNameComponent,
        InputPasswordComponent,
        InputPhoneComponent,
        InputPositionComponent,
    ]
})
export class ReactiveInputModule { }
