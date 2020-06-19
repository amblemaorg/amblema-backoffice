import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsValidateInformationRoutingModule } from './requests-validate-information-routing.module';
import { RequestsValidateInformationComponent } from './requests-validate-information.component';
import {
  NbCardModule,
  NbDialogModule,
  NbButtonModule,
  NbAlertModule,
  NbInputModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InformationDetailsComponent } from './information-details/information-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialWorkshopDetailsComponent } from './initial-workshop-details/initial-workshop-details.component';

// Import the library
import { CarouselModule } from 'ngx-owl-carousel-o';
// Needs to import the BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { SliderDetailsComponent } from './slider-details/slider-details.component';
import { TestimonyDetailsComponent } from './testimony-details/testimony-details.component';
import { ProgressModule } from '../../components/shared/progress/progress.module';
import { SpecialActivityDetailsComponent } from './special-activity-details/special-activity-details.component';

@NgModule({
  entryComponents: [
    TestimonyDetailsComponent,
    SliderDetailsComponent,
    ActivityDetailsComponent,
    InformationDetailsComponent,
    SpecialActivityDetailsComponent
  ],
  declarations: [
    RequestsValidateInformationComponent,
    InformationDetailsComponent,
    InitialWorkshopDetailsComponent,
    ActivityDetailsComponent,
    SliderDetailsComponent,
    TestimonyDetailsComponent,
    SpecialActivityDetailsComponent,
  ],
  imports: [
    CarouselModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    NbButtonModule,
    CommonModule,
    NbAlertModule,
    ProgressModule,
    NbInputModule,
    RequestsValidateInformationRoutingModule,
    NbDialogModule.forChild(),
  ],
})
export class RequestsValidateInformationModule {}
