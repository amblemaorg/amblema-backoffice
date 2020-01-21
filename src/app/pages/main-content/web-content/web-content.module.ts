import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebContentRoutingModule } from './web-content-routing.module';
import { WebContentComponent } from './web-content.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [WebContentComponent],
  imports: [
    CommonModule,
    WebContentRoutingModule,
    NbCardModule
  ]
})
export class WebContentModule { }
