import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PecaSettingRoutingModule } from "./peca-setting-routing.module";
import { PecaSettingComponent } from "./peca-setting.component";
@NgModule({
  declarations: [PecaSettingComponent],
  imports: [CommonModule, PecaSettingRoutingModule],
})
export class PecaSettingModule {}
