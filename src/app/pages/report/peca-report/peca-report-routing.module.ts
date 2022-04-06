import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PecaReportComponent } from "./peca-report.component";

const routes: Routes = [{ path: "", component: PecaReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PecaReportRoutingModule {}
