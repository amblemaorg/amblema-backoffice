import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsValidateInformationComponent } from './requests-validate-information.component';

describe('RequestsValidateInformationComponent', () => {
  let component: RequestsValidateInformationComponent;
  let fixture: ComponentFixture<RequestsValidateInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsValidateInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsValidateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
