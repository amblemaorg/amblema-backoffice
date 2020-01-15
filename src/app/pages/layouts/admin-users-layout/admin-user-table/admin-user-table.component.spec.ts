import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTableComponent } from './admin-user-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

describe('AdminUserTableComponent', () => {
  let component: AdminUserTableComponent;
  let fixture: ComponentFixture<AdminUserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserTableComponent ],
      imports: [
        Ng2SmartTableModule,

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
