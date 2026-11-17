import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetLoaderComponent } from './loader/sheet-loader.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { AccessRequestsComponent } from './access-requests/access-requests.component';
import { SheetsComponent } from './sheets/sheets.component';
import { CatalogSettingsComponent } from './catalog-settings/catalog-settings.component';
import { ModerationComponent } from './moderation/moderation.component';

/** Rutas del módulo Vademécum (BO-01). El permiso se valida en pages-routing con VademecumGuard. */
const routes: Routes = [
  { path: '', redirectTo: 'load', pathMatch: 'full' },
  { path: 'load', component: SheetLoaderComponent },
  { path: 'sheets', component: SheetsComponent },
  { path: 'catalog-settings', component: CatalogSettingsComponent },
  { path: 'access-requests', component: AccessRequestsComponent },
  { path: 'moderation', component: ModerationComponent },
  { path: 'indicators', component: IndicatorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VademecumRoutingModule {}
