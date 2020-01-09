import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/services/validation.service';
import { NAME_MESSAGE, LAST_NAME_MESSAGE } from '../shared/constant/validation-messages-list';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  readonly NAME_MESSAGE = NAME_MESSAGE;
  readonly LAST_NAME_MESSAGE = LAST_NAME_MESSAGE;

  submitted = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN) ]),
    lastName : new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    type: new FormControl('V'),
    document : new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)])
  });

  constructor( private validationService: ValidationService ) { }

  ngOnInit() {  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.valid) {
      // Working on your validated form data
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

}
