import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersLayoutComponent } from './admin-users-layout.component';
import { NbCardModule } from '@nebular/theme';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

describe('AdminUsersLayoutComponent', () => {
  let component: AdminUsersLayoutComponent;
  let fixture: ComponentFixture<AdminUsersLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminUserTableComponent,
        AdminUsersLayoutComponent ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
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
