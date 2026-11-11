import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbProgressBarModule,
  NbSelectModule,
} from '@nebular/theme';
import { VademecumRoutingModule } from './vademecum-routing.module';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';

@NgModule({
  declarations: [UploadListComponent, UploadFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
    NbSelectModule,
    VademecumRoutingModule,
  ],
})
export class VademecumModule {}
