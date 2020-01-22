import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebContentComponent } from './web-content.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { CoordinatorsComponent } from './coordinators/coordinators.component';
import { SchoolsComponent } from './schools/schools.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component: WebContentComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').
        then(m => m.HomeModule)
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'sponsors',
        component: SponsorsComponent
      },
      {
        path: 'coordinators',
        component: CoordinatorsComponent
      },
      {
        path: 'schools',
        component: SchoolsComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebContentRoutingModule { }
