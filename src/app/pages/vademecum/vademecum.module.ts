import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
} from '@nebular/theme';
import { VademecumRoutingModule } from './vademecum-routing.module';
import { SheetLoaderComponent } from './loader/sheet-loader.component';

@NgModule({
  declarations: [SheetLoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbProgressBarModule,
    NbSelectModule,
    VademecumRoutingModule,
  ],
})
export class VademecumModule {}
