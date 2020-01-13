import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersLayoutComponent } from './admin-users-layout.component';

describe('AdminUsersLayoutComponent', () => {
  let component: AdminUsersLayoutComponent;
  let fixture: ComponentFixture<AdminUsersLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersLayoutComponent ]
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
