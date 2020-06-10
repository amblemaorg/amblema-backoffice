import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorReportComponent } from './sponsor-report.component';


const routes: Routes = [
  { path: '', component: SponsorReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorReportRoutingModule { }
