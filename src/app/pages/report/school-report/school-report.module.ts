import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SchoolReportRoutingModule } from "./school-report-routing.module";
import { SchoolReportComponent } from "./school-report.component";
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SchoolReportComponent],
  imports: [
    SchoolReportRoutingModule,
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    FormsModule,
    NbIconModule,
  ],
})
export class SchoolReportModule {}
