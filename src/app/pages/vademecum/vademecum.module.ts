import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { VademecumRoutingModule } from './vademecum-routing.module';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';

@NgModule({
  declarations: [UploadListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
    VademecumRoutingModule,
  ],
})
export class VademecumModule {}
