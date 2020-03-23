import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRequestsComponent } from './creation-requests.component';

describe('CreationRequestsComponent', () => {
  let component: CreationRequestsComponent;
  let fixture: ComponentFixture<CreationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
