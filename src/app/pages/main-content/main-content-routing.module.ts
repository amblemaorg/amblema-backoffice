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
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').
    then(m => m.LearningModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./peca-setting/peca-setting.module').
    then(m => m.PecaSettingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
