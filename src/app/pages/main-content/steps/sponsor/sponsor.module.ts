import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorComponent } from './sponsor.component';
import { NbCardModule } from '@nebular/theme';
import { HelpersModule } from '../_helpers/helpers.module';

@NgModule({
  declarations: [SponsorComponent],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    NbCardModule,
    HelpersModule,
  ]
})
export class SponsorModule { }
