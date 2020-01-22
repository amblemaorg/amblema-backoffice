import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUploadComponent } from './img-upload/img-upload.component';

@NgModule({
  declarations: [ImgUploadComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ImgUploadComponent
  ]
})
export class FileComponentsModule { }
