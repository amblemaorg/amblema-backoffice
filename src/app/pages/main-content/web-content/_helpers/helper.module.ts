import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { FileComponentsModule } from 'src/app/pages/file-components/file-components.module';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { SlideTableComponent } from './slide-table/slide-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TextAreaDescriptionComponent } from './text-area-description/text-area-description.component';
import { NbInputModule } from '@nebular/theme';

@NgModule({
    declarations: [
        SlideFormComponent,
        SlideTableComponent,
        TextAreaDescriptionComponent
    ],
    imports: [
        CommonModule,
        FileComponentsModule,
        SharedFormsModule,
        Ng2SmartTableModule,
        NbInputModule
    ],
    exports: [
        SlideFormComponent,
        TextAreaDescriptionComponent
    ]
})
export class HelperModule { }
