import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralsComponent } from './generals.component';


const routes: Routes = [
  { path: '', component: GeneralsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralsRoutingModule { }
