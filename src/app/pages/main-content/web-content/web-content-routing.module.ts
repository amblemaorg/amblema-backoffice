import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebContentComponent } from './web-content.component';
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
        loadChildren: () => import('./about-us/about-us.module').
        then(m => m.AboutUsModule)
      },
      {
        path: 'sponsors',
        loadChildren: () => import('./sponsors/sponsors.module').
        then(m => m.SponsorsModule)
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
