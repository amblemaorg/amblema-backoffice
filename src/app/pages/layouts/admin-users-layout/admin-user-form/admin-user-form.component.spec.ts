import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserFormComponent } from './admin-user-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedFormsModule } from 'src/app/pages/forms/shared-forms.module';
import { SharedComponentsModule } from 'src/app/pages/components/shared-components.module';

describe('AdminUserFormComponent', () => {
  let component: AdminUserFormComponent;
  let fixture: ComponentFixture<AdminUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminUserFormComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedFormsModule,
        SharedComponentsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
