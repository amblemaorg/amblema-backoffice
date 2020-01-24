import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { BlogCardComponent } from './blog-card/blog-card.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule, 
    NbCardModule, 
    NbInputModule, 
    NbIconModule
  ]
})
export class BlogModule { }
