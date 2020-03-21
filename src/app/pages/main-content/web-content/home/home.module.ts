import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormSliderModule } from 'src/app/pages/components/form-components/forms/form-slider/form-slider.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    HelperModule,
    Ng2SmartTableModule,

    FormSliderModule,
  ]
})
export class HomeModule { }