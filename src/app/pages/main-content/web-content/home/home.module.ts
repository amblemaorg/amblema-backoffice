import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { SlideFormComponent } from './slide-form/slide-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    SlideFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule
  ]
})
export class HomeModule { }
