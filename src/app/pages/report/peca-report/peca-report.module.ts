import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PecaReportRoutingModule } from "./peca-report-routing.module";
import { PecaReportComponent } from "./peca-report.component";
import {
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
  NbButtonModule,
  NbRadioModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PecaPdfReportTemplateComponent } from "../pdf-templates/peca-pdf-report-template/peca-pdf-report-template.component";

@NgModule({
  declarations: [PecaReportComponent, PecaPdfReportTemplateComponent],
  imports: [
    CommonModule,
    PecaReportRoutingModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbRadioModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class PecaReportModule {}
