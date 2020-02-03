import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaAboutComponent } from './text-area-about';
import { TextAreaCustomComponent } from './text-area-custom';
import { TextAreaDescriptionComponent } from './text-area-description';
import { TextAreaEnviromentComponent } from './text-area-enviroment';
import { TextAreaMathComponent } from './text-area-math';
import { TextAreaReadingComponent } from './text-area-reading';
import { NbInputModule } from '@nebular/theme';
import { ReactiveValidationModule } from '../reactive-validation/reactive-validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    TextAreaAboutComponent,
    TextAreaCustomComponent,
    TextAreaDescriptionComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent
  ],
  declarations: [
    TextAreaAboutComponent,
    TextAreaCustomComponent,
    TextAreaDescriptionComponent,
    TextAreaEnviromentComponent,
    TextAreaMathComponent,
    TextAreaReadingComponent
  ],
  imports: [
    CommonModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveValidationModule
  ]
})
export class ReactiveTextAreaModule { }
