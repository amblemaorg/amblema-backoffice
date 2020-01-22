import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBase } from '../../shared/base-form';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN, EMAIL_PATTERN } from 'src/app/pages/forms/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
  styleUrls: ['./coordinators-users-form.component.scss']
})
export class CoordinatorsUsersFormComponent extends FormBase implements OnInit {

  formCoordinators: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    type: new FormControl('V'),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    status: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required])
  });

  constructor(private validationService: ValidationService) {
    super('un coordinador');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formCoordinators.valid) {
      // Define act
      if ( this.mode === this.ACTION.CREATE ) {

        this.create.emit('');

      } else {
        this.edit.emit('');
      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formCoordinators);
    }
  }
}
