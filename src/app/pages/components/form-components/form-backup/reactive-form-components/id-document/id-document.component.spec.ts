import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdDocumentComponent } from './id-document.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveValidationComponent } from '../../../reactive-validation/reactive-validation.component';
import { NUMBER_PATTERN } from '../../../shared/constant/validation-patterns-list';

describe('IdDocumentComponent', () => {
  let component: IdDocumentComponent;
  let fixture: ComponentFixture<IdDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReactiveValidationComponent,
        IdDocumentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(IdDocumentComponent);
    component = fixture.componentInstance;
  });

  it('TestCase#2023 - should have required and pattern', () => {
    const form: FormGroup = new FormGroup({
      document: new FormControl(null, [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
      select: new FormControl('V')
    });

    component.controlSelect = form.get('select');
    component.control = form.get('document');
    component.label = 'Documento';

    // Set a wrong value must be false
    component.control.setValue('dwada');
    component.submitted = true;

    expect(component.control.valid).toBeFalsy();
    // After set a wrong value, must be false required at form
    expect(component.control.errors.required).toBeFalsy();

    fixture.detectChanges();
  });

  it('TestCase#2024 - should validate the number of characters for document type V', () => {

    const form: FormGroup = new FormGroup({
      document: new FormControl(null),
      select: new FormControl('V')
    });

    component.control = form.get('document');
    component.controlSelect = form.get('select');
    component.changeDocument('V');

    // Range >= 7 or 8 <=
    component.control.setValue('1234567');
    expect(component.control.valid).toBeTruthy();
    fixture.detectChanges();
  });


  it('TestCase#2027 - should validate the number of characters for the document type J', () => {
    const form: FormGroup = new FormGroup({
      document: new FormControl(null),
      select: new FormControl('V')
    });

    component.control = form.get('document');
    component.controlSelect = form.get('select');
    component.changeDocument('J');

    // Range >= 8 or 9 <=
    component.control.setValue('33333333');
    expect(component.control.valid).toBeTruthy();
    fixture.detectChanges();
  });

  it('TestCase#2029 - should validate the number of characters for the document type E', () => {
    const form: FormGroup = new FormGroup({
      document: new FormControl(null),
      select: new FormControl('V')
    });

    component.control = form.get('document');
    component.controlSelect = form.get('select');
    component.changeDocument('E');

    // Range >= 10 or 10 <=
    component.control.setValue('3333333333');
    expect(component.control.valid).toBeTruthy();
    fixture.detectChanges();
  });
});
