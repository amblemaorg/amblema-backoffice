import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoordinatorComponent } from './select-coordinator.component';

describe('SelectCoordinatorComponent', () => {
  let component: SelectCoordinatorComponent;
  let fixture: ComponentFixture<SelectCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
