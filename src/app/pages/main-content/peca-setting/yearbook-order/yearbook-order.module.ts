import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbAlertModule, NbAccordionModule, NbSpinnerModule } from '@nebular/theme';
import { YearbookOrderRoutingModule } from './yearbook-order-routing.module';
import { YearbookOrderComponent } from './yearbook-order.component';

@NgModule({
  declarations: [YearbookOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbAlertModule,
    NbAccordionModule,
    NbSpinnerModule,
    YearbookOrderRoutingModule
  ]
})
export class YearbookOrderModule { }
