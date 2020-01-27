import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebContentComponent } from './web-content.component';

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
        loadChildren: () => import('./coordinators/coordinators.module').
        then(m => m.CoordinatorsModule)
      },
      {
        path: 'schools',
        loadChildren: () => import('./schools/schools.module').
        then(m => m.SchoolsModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').
        then(m => m.BlogModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebContentRoutingModule { }
