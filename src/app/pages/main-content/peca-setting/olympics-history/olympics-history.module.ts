import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { OlympicsHistoryRoutingModule } from './olympics-history-routing.module';
import { OlympicsHistoryComponent } from './olympics-history.component';

@NgModule({
  declarations: [OlympicsHistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbIconModule,
    NbSpinnerModule,
    OlympicsHistoryRoutingModule
  ]
})
export class OlympicsHistoryModule { }
