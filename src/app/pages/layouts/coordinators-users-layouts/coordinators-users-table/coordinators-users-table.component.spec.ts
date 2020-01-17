import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsUsersTableComponent } from './coordinators-users-table.component';

describe('CoordinatorsUsersTableComponent', () => {
  let component: CoordinatorsUsersTableComponent;
  let fixture: ComponentFixture<CoordinatorsUsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsUsersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
