import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepsComponent } from './steps.component';


const routes: Routes = [
  {
    path: '',
    component: StepsComponent,
    children: [
      {
        path: 'generals',
        loadChildren: () => import('./generals/generals.module').
        then(m => m.GeneralsModule)
      },
      {
        path: 'sponsor',
        loadChildren: () => import('./sponsor/sponsor.module').
        then(m => m.SponsorModule)
      },
      {
        path: 'coordinator',
        loadChildren: () => import('./coordinator/coordinator.module').
        then(m => m.CoordinatorModule)
      },
      {
        path: 'school',
        loadChildren: () => import('./school/school.module').
        then(m => m.SchoolModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsRoutingModule { }
