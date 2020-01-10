import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveInputComponent } from './reactive-input.component';
import { NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { ReactiveValidationComponent } from '../reactive-validation/reactive-validation.component';
import { NORMAL_TEXT_PATTERN, EMAIL_PATTERN, NUMBER_PATTERN } from '../../shared/constant/validation-patterns-list';

describe('ReactiveInputComponent', () => {
  let component: ReactiveInputComponent;
  let fixture: ComponentFixture<ReactiveInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveValidationComponent,
        ReactiveInputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NbSelectModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveInputComponent);
    component = fixture.componentInstance;
  });

  it('TestCase#2018, TestCase#2020 - should have required', () => {
    const form: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    component.control = form.get('name');
    component.label = 'nombre';
    component.submitted = true;
    expect(component.control.errors.required).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2018, TestCase#2020, TestCase#2064 - should validate that the name field only accepts letters', () => {

    const form: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.pattern(NORMAL_TEXT_PATTERN)])
    });

    component.control = form.get('name');
    component.control.setValue('Hello World');
    component.label = 'nombre';
    component.submitted = true;

    expect(component.control.valid).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2044 - should validate that the email field corresponds to the format xxxxxxx@xxxxxxxxxxxx.com', () => {

    const form: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.pattern(EMAIL_PATTERN)])
    });

    component.control = form.get('email');
    component.control.setValue('example@gmail.com');
    component.label = 'email';
    component.submitted = true;

    expect( component.control.valid ).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2058 - should validate that the telephone field accepts only numbers', () => {

    const form: FormGroup = new FormGroup({
      phone: new FormControl(null, [Validators.pattern(NUMBER_PATTERN)])
    });

    component.control = form.get('phone');
    component.control.setValue('234234');
    component.label = 'phone';
    component.submitted = true;

    expect( component.control.valid ).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2062 - should validate that the user can register a maximum of 8 characters in the password field', () => {
    const form: FormGroup = new FormGroup({
      pwd: new FormControl(null, [Validators.maxLength(8)])
    });

    component.control = form.get('pwd');
    component.control.setValue('32423');
    component.submitted = true;

    expect( component.control.valid ).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2062 - should validate that the user can register a maximum of 8 characters in the password field', () => {
    const form: FormGroup = new FormGroup({
      pwd: new FormControl(null, [Validators.maxLength(8)])
    });

    component.control = form.get('pwd');
    component.control.setValue('32423');
    component.submitted = true;

    expect( component.control.valid ).toBeTruthy();
    fixture.detectChanges();
  });
});
