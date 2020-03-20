import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchoolComponent } from './select-school.component';

describe('SelectSchoolComponent', () => {
  let component: SelectSchoolComponent;
  let fixture: ComponentFixture<SelectSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
