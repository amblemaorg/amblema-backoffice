import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('ValidationService', () => {

  const service: ValidationService = new ValidationService();

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const mockService: ValidationService = TestBed.get(ValidationService);
    expect(mockService).toBeTruthy();
  });

  it('should be mark form control as dirty', () => {
    const form: FormGroup = new FormGroup({
      name: new FormControl(null)
    });

    expect(form.controls.name.dirty).toBeFalsy();

    // -- Mark the form --
    service.markAllFormFieldsAsTouched( form );

    expect(form.controls.name.dirty).toBeTruthy();
  });


  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
