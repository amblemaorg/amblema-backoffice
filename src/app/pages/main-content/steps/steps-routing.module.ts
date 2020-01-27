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
        path: 'sponsor' 
      },
      {
        path: 'coordinator'
      }, 
      {
        path: 'school'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsRoutingModule { }
