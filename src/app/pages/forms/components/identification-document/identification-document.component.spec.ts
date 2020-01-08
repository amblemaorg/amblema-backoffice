import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationDocumentComponent } from './identification-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('IdentificationDocumentComponent', () => {
  let component: IdentificationDocumentComponent;
  let fixture: ComponentFixture<IdentificationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationDocumentComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TestCase#2023 - should have required and pattern', () => {

    const documentNumber = component.form.controls.documentNumber;
    expect(documentNumber.errors.required).toBeTruthy();

    // Set a wrong value to test the pattern
    documentNumber.setValue('Hello World');
    expect(documentNumber.errors.pattern).toBeTruthy();
  });

  it('TestCase#2024 - should validate the number of characters for document type V', () => {
    const documentType = component.form.controls.documentType;

    // Make a required input
    documentType.setValue('');
    expect(documentType.errors.required).toBeTruthy();

    // Change type document
    component.changeDocument('V');

    // Should be error
    const documentNumber = component.form.controls.documentNumber;
    documentNumber.setValue('32422');
    expect(documentNumber.errors.minlength).toBeTruthy();
    documentNumber.setValue('23423423423');
    expect(documentNumber.errors.maxlength).toBeTruthy();
  });

  it('TestCase#2027 - should validate the number of characters for the document type J', () => {
    // Change type document
    component.changeDocument('J');

    // Should be error
    const documentNumber = component.form.controls.documentNumber;
    documentNumber.setValue('1234567');
    expect(documentNumber.errors.minlength).toBeTruthy();
    documentNumber.setValue('0123456789');
    expect(documentNumber.errors.maxlength).toBeTruthy();
  });


  it('TestCase#2027 - should validate the number of characters for the document type E', () => {
    // Change type document
    component.changeDocument('E');

    // Should be error
    const documentNumber = component.form.controls.documentNumber;
    documentNumber.setValue('342444343');
    expect(documentNumber.errors.minlength).toBeTruthy();
    documentNumber.setValue('012345678933');
    expect(documentNumber.errors.maxlength).toBeTruthy();
  });

});
