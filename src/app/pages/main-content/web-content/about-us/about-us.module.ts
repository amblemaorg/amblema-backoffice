import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { NbCardModule } from '@nebular/theme';
import { AboutUsComponent } from './about-us.component';
import { HelperModule } from '../_helpers/helper.module';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    NbCardModule,
    HelperModule
  ]
})
export class AboutUsModule { }
