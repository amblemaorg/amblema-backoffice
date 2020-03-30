import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputImgComponent } from './input-img/input-img.component';
import { InputFileComponent } from './input-file/input-file.component';
import { NbIconModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';

@NgModule({
  declarations: [
    InputImgComponent,
    InputFileComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    FormsModule,
    NbButtonModule,
    NbAlertModule,
    ReactiveFormsModule,
    ReactiveValidationModule,

  ],
  exports: [
    InputImgComponent,
    InputFileComponent
  ]
})
export class ReactiveInputFileModule { }
