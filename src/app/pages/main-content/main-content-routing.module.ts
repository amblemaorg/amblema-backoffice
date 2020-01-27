import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'web',
    loadChildren: () => import('./web-content/web-content.module').
    then(m => m.WebContentModule)
  },
  {
    path: 'steps',
    loadChildren: () => import('./steps/steps.module').
    then(m => m.StepsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
