import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-crud';
import { BaseForm } from '../../shared/base-form';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends BaseForm {

  formUser: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    type: new FormControl(),
    document: new FormControl(),
    position: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    status: new FormControl(),
    state: new FormControl(),
    municipality: new FormControl(),
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
