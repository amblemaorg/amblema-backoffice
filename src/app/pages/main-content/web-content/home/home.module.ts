import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { HelperModule } from '../_helpers/helper.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormSliderModule } from 'src/app/pages/_components/form-components/forms/form-slider/form-slider.module';
import { ProgressModule } from 'src/app/pages/_components/shared/progress/progress.module';

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
    NbButtonModule,
    FormSliderModule,
    ProgressModule,
    NbSpinnerModule
  ]
})
export class HomeModule { }
