import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';
import { ReactiveInputFileModule } from 'src/app/pages/forms/reactive-input-file/reactive-input-file.module';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';

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
    SharedComponentsModule,
    SharedFormsModule,
    ReactiveInputFileModule,
  ]
})
export class BlogModule { }
