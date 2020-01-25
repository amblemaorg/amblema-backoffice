import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';
import {
  NORMAL_TEXT_PATTERN,
  EMAIL_PATTERN,
  NUMBER_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-schools-users-form',
  templateUrl: './schools-users-form.component.html',
  styleUrls: ['./schools-users-form.component.scss']
})
export class SchoolsUsersFormComponent extends BaseForm implements OnInit {

  formSchool: FormGroup = new FormGroup({
    name: new FormControl(),
    campusCode: new FormControl('', [Validators.required]),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),

    // Address
    state: new FormControl(),
    municipality: new FormControl(),
    street: new FormControl('', [Validators.required]),

    // Contact
    nameContact: new FormControl(),
    lastNameContact: new FormControl(),
    emailContact: new FormControl(),
    phoneContact: new FormControl(),

    // Status
    status: new FormControl(),
  });

  constructor(private validationService: ValidationService) {
    super('una escuela');

  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formSchool.valid) {
      // Define act
      if ( this.MODE === this.ACTION.CREATE ) {

        this.create.emit('');

      } else {
        this.edit.emit('');
      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formSchool);
    }
  }


}
