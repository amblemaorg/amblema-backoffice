import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTableComponent } from './admin-user-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserFormComponent } from '../admin-user-form/admin-user-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';

describe('AdminUserTableComponent', () => {
  let component: AdminUserTableComponent;
  let fixture: ComponentFixture<AdminUserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminUserFormComponent,
        AdminUserTableComponent
       ],
      imports: [
        Ng2SmartTableModule,
        ReactiveFormsModule,
        FormsModule,
        SharedFormsModule,
        SharedComponentsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
