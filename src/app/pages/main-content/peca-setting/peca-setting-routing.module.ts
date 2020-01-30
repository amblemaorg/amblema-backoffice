import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PecaSettingComponent } from './peca-setting.component';

const routes: Routes = [
  {
    path: '',
    component: PecaSettingComponent,
    children: [
      {
        path: 'workshop',
        loadChildren: () => import('./workshop/workshop.module').
        then(m => m.WorkshopModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PecaSettingRoutingModule { }
