import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSelectorComponent } from './status-selector.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReactiveInputComponent } from '../reactive-form-components/reactive-input/reactive-input.component';
import { ReactiveValidationComponent } from '../reactive-form-components/reactive-validation/reactive-validation.component';

describe('StatusSelectorComponent', () => {
  let component: StatusSelectorComponent;
  let fixture: ComponentFixture<StatusSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveValidationComponent,
        StatusSelectorComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
