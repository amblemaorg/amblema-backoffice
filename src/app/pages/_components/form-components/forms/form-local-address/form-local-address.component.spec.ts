import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocalAddressComponent } from './form-local-address.component';

describe('FormLocalAddressComponent', () => {
  let component: FormLocalAddressComponent;
  let fixture: ComponentFixture<FormLocalAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLocalAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLocalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
