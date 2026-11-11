import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
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
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';

@NgModule({
  declarations: [UploadListComponent, UploadFormComponent, UploadDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
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
