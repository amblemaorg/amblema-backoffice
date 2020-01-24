import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { SharedFormsModule } from 'src/app/pages/components/form-components/shared-forms.module';
import { SlideTableComponent } from './slide-table/slide-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';
import { ContentTextComponent } from './content-text/content-text.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
    declarations: [
        SlideFormComponent,
        SlideTableComponent,
        ContentTextComponent,
        GenericFormComponent,
        GenericTableComponent,
    ],
    imports: [
        CommonModule,
        ReactiveInputFileModule,
        SharedFormsModule,
        Ng2SmartTableModule,
    ],
    exports: [
        SlideFormComponent,
        ContentTextComponent,
        GenericFormComponent
    ]
})
export class HelperModule { }
