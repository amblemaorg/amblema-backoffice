import { Component, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  NORMAL_TEXT_PATTERN,
  NUMBER_PATTERN,
  EMAIL_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-crud';
import { FormBase } from '../../shared/base-form';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends FormBase implements OnChanges {

  formUser: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    type: new FormControl('V'),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    position: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    role: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required])
  });

  constructor( private validationService: ValidationService ) { super(); }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formUser.valid) {
      // Define act
      if ( this.MODE === ACTION.CREATE ) {

        this.create.emit('');

      } else {
        this.edit.emit('');
      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formUser);
    }
  }
}
