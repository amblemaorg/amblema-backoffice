import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { ModalModule as FormModalModule } from '../_components/shared/modal/modal-forms/modal.module';
import { VademecumRoutingModule } from './vademecum-routing.module';
import { SheetLoaderComponent } from './loader/sheet-loader.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { AccessRequestsComponent } from './access-requests/access-requests.component';
import { SheetsComponent } from './sheets/sheets.component';
import { CatalogSettingsComponent } from './catalog-settings/catalog-settings.component';
import { SheetTypesComponent } from './catalog-settings/sheet-types.component';
import { AreasComponent } from './catalog-settings/areas.component';
import { SiteTextsComponent } from './catalog-settings/site-texts.component';
import { ModerationComponent } from './moderation/moderation.component';

@NgModule({
  declarations: [
    SheetLoaderComponent,
    IndicatorsComponent,
    AccessRequestsComponent,
    SheetsComponent,
    CatalogSettingsComponent,
    SheetTypesComponent,
    AreasComponent,
    SiteTextsComponent,
    ModerationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbProgressBarModule,
    NbRadioModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
    Ng2SmartTableModule,
    QuillModule.forRoot(),
    FormModalModule,
    VademecumRoutingModule,
  ],
})
export class VademecumModule {}
