import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ReactiveInputModule } from 'src/app/pages/components/form-components/reactive-input/reactive-input.module';
import { ReactiveSelectModule } from 'src/app/pages/components/form-components/reactive-select/reactive-select.module';
import { ModalModule } from 'src/app/pages/components/shared/modal/modal-forms/modal.module';
import { ReactiveTextAreaModule } from 'src/app/pages/components/form-components/reactive-text-area/reactive-text-area.module';
import { ReactiveInputFileModule } from 'src/app/pages/components/form-components/reactive-input-file/reactive-input-file.module';

@NgModule({
  declarations: [
    BlogComponent,
    BlogCardComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,

    // Add custom module
    ReactiveInputModule,
    ReactiveTextAreaModule,
    ReactiveInputFileModule,
    ReactiveSelectModule,
    ModalModule,
  ]
})
export class BlogModule { }
