import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/services/validation.service';
import { MESSAGES } from '../shared/constant/validation-messages-list';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN, EMAIL_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  readonly MESSAGES = MESSAGES;

  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    type: new FormControl('V'),
    document: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)])
  });

  constructor(private validationService: ValidationService) { }

  ngOnInit() { }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.valid) {
      // Working on your validated form data
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

}
