import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
} from '@nebular/theme';
import { VademecumRoutingModule } from './vademecum-routing.module';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';
import { CutReviewComponent } from './uploads/cut-review/cut-review.component';
import { SheetEditorComponent } from './uploads/sheet-editor/sheet-editor.component';

@NgModule({
  declarations: [
    UploadListComponent,
    UploadFormComponent,
    UploadDetailComponent,
    CutReviewComponent,
    SheetEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbProgressBarModule,
    NbSelectModule,
    VademecumRoutingModule,
  ],
})
export class VademecumModule {}
