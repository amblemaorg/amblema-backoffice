import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsUsersLayoutsComponent } from './coordinators-users-layouts.component';

describe('CoordinatorsUsersLayoutsComponent', () => {
  let component: CoordinatorsUsersLayoutsComponent;
  let fixture: ComponentFixture<CoordinatorsUsersLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsUsersLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsUsersLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
