import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideFormComponent } from './slide-form/slide-form.component';
import { SlideTableComponent } from './slide-table/slide-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentTextComponent } from './content-text/content-text.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from 'src/app/pages/components/form-components/reactive-select/reactive-select.module';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';

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
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,

        // Add custom module
        ReactiveInputModule,
        ReactiveSelectModule,
        ReactiveTextAreaModule,
        ReactiveInputFileModule,
    ],
    exports: [
        SlideFormComponent,
        ContentTextComponent,
        GenericFormComponent,
    ]
})
export class HelperModule { }
