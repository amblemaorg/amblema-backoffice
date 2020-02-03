import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputImgComponent } from './input-img/input-img.component';
import { InputFileComponent } from './input-file/input-file.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [ 
    InputImgComponent,
    InputFileComponent
  ],
  imports: [
    CommonModule,
    NbIconModule
  ],
  exports: [
    InputImgComponent,
    InputFileComponent
  ]
})
export class ReactiveInputFileModule { }
