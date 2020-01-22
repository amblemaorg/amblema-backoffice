import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebContentRoutingModule } from './web-content-routing.module';
import { WebContentComponent } from './web-content.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { CoordinatorsComponent } from './coordinators/coordinators.component';
import { SchoolsComponent } from './schools/schools.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [ 
    WebContentComponent, 
    AboutUsComponent, 
    SponsorsComponent, 
    CoordinatorsComponent, 
    SchoolsComponent, 
    BlogComponent, 
  ],
  imports: [
    CommonModule,
    WebContentRoutingModule,
  ],
})
export class WebContentModule { }
