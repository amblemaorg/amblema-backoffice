import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { FileComponentsModule } from 'src/app/pages/file-components/file-components.module';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { SlideTableComponent } from './slide-table/slide-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    declarations: [
        SlideFormComponent,
        SlideTableComponent
    ],
    imports: [
        CommonModule,
        FileComponentsModule,
        SharedFormsModule,
        Ng2SmartTableModule
    ],
    exports: [
        SlideFormComponent,
    ]
})
export class HelperModule { }
