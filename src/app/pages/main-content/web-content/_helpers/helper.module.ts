import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentTextComponent } from './content-text/content-text.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { ReactiveInputModule } from 'src/app/pages/_components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from 'src/app/pages/_components/form-components/reactive-select/reactive-select.module';
import { ReactiveTextAreaModule } from 'src/app/pages/_components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveInputFileModule } from 'src/app/pages/_components/form-components/reactive-input-file/reactive-input-file.module';
import { AwardFormComponent } from './award-form/award-form.component';
import { NbButtonModule } from '@nebular/theme';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [
        ContentTextComponent,
        TestimonialFormComponent,
        AwardFormComponent,
        SponsorListComponent,
    ],
    imports: [
        CommonModule,
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        NgSelectModule,

        // Add custom module
        ReactiveInputModule,
        ReactiveSelectModule,
        ReactiveTextAreaModule,
        ReactiveInputFileModule,
    ],
    exports: [
        ContentTextComponent,
        AwardFormComponent,
        TestimonialFormComponent,
        SponsorListComponent
    ]
})
export class HelperModule { }
