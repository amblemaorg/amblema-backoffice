import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsUsersFormComponent } from './coordinators-users-form.component';

describe('CoordinatorsUsersFormComponent', () => {
  let component: CoordinatorsUsersFormComponent;
  let fixture: ComponentFixture<CoordinatorsUsersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsUsersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
