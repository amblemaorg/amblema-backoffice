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
      {
        path: 'lapse',
        loadChildren: () => import('./lapse/lapse.module').
        then(m => m.LapseModule)
      },
      {
        path: 'coins',
        loadChildren: () => import('./coins/coins.module').
        then(m => m.CoinsModule)
      },
      {
        path: 'convention',
        loadChildren: () => import('./convention/convention.module').
        then(m => m.ConventionModule)
      },
      {
        path: 'activity-strategies',
        loadChildren: () => import('./activity-strategies/activity-strategies.module').
        then(m => m.ActivityStrategiesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PecaSettingRoutingModule { }
