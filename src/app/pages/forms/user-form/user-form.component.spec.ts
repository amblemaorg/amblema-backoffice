import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentificationDocumentComponent } from '../components/identification-document/identification-document.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IdentificationDocumentComponent,
        UserFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestCase#2018 - should have required and pattern', () => {
    const name = component.form.controls.name;

    expect(name.errors.required).toBeTruthy();

    // Set a wrong value to test the pattern
    name.setValue('3445');
    expect(name.errors.pattern).toBeTruthy();
  });

  it('TestCase#2018 - should validate that the name field only accepts letters', () => {
    const form = component.form.controls.name;
    form.setValue('Hello World');
    expect(form.valid).toBeTruthy();
  });


  it('TestCase#2020 - should have required and pattern', () => {
    const lastName = component.form.controls.lastName;

    expect(lastName.errors.required).toBeTruthy();

    // Set a wrong value to test the pattern
    lastName.setValue('3445');
    expect(lastName.errors.pattern).toBeTruthy();
  });

  it('TestCase#2020 - should validate that the last name field only accepts letters', () => {
    const form = component.form.controls.lastName;
    form.setValue('Hello World');
    expect(form.valid).toBeTruthy();
  });


});
