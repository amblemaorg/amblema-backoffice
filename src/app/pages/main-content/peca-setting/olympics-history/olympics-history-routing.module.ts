import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OlympicsHistoryComponent } from './olympics-history.component';

const routes: Routes = [
  {
    path: '',
    component: OlympicsHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlympicsHistoryRoutingModule { }
