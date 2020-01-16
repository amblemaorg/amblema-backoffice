import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule } from '@nebular/theme';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';
import { SharedFormsModule } from '../../forms/shared-forms.module';
import { SharedComponentsModule } from '../../components/shared-components.module';

describe('AdminUsersLayoutComponent', () => {
  let component: AdminUsersLayoutComponent;
  let fixture: ComponentFixture<AdminUsersLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminUserTableComponent,
        AdminUsersLayoutComponent,
        AdminUserFormComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule,
        SharedFormsModule,
        SharedComponentsModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
