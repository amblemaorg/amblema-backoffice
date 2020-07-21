import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { NbButtonModule, NbAlertModule } from '@nebular/theme';

@NgModule({
  declarations: [DialogConfirmationComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbAlertModule,
  ],
  exports: [DialogConfirmationComponent]
})
export class DialogModule { }
