import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../../shared/base-form';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
})
export class CoordinatorsUsersFormComponent extends BaseForm implements OnInit {

  formCoordinators: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    type: new FormControl(),
    document: new FormControl(),
    password: new FormControl(),
    status: new FormControl(),
    state: new FormControl(),
    municipality: new FormControl(),
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
      if ( this.MODE === this.ACTION.CREATE ) {

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
