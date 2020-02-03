import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule } from '@nebular/theme';
import { AboutUsComponent } from './about-us.component';
import { HelperModule } from '../_helpers/helper.module';
import { AboutFormComponent } from './about-form/about-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AboutUsRoutingModule } from './about-us-routing.module';

@NgModule({
  declarations: [
    AboutUsComponent,
    AboutFormComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    NbCardModule,
    HelperModule,
    Ng2SmartTableModule, 
  ]
})
export class AboutUsModule { }
