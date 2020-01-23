import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebContentRoutingModule } from './web-content-routing.module';
import { WebContentComponent } from './web-content.component';
import { CoordinatorsComponent } from './coordinators/coordinators.component';
import { SchoolsComponent } from './schools/schools.component';
import { BlogComponent } from './blog/blog.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [
    WebContentComponent,
    CoordinatorsComponent,
    SchoolsComponent,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    WebContentRoutingModule,
    NbCardModule
  ],
})
export class WebContentModule { }
