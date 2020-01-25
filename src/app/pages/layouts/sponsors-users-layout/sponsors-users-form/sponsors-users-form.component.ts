import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseForm } from '../../shared/base-form';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',
  styleUrls: ['./sponsors-users-form.component.scss'],
})
export class SponsorsUsersFormComponent extends BaseForm implements OnInit {

  formSponsor: FormGroup = new FormGroup({
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
    super('un padrino');

  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formSponsor.valid) {
      // Define act
      if (this.MODE === this.ACTION.CREATE) {

        this.create.emit('');

      } else {
        this.edit.emit('');
      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formSponsor);
    }
  }

}
