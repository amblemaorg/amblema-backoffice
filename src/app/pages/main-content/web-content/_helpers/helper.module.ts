import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { FileComponentsModule } from 'src/app/pages/file-components/file-components.module';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';

@NgModule({
    declarations: [
        SlideFormComponent
    ],
    imports: [
        CommonModule,
        FileComponentsModule,
        SharedFormsModule,
    ],
    exports: [
        SlideFormComponent,
    ]
})
export class HelperModule { }
