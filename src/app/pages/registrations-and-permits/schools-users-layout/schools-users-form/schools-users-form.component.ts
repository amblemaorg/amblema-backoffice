import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';

@Component({
  selector: 'app-schools-users-form',
  templateUrl: './schools-users-form.component.html',
})
export class SchoolsUsersFormComponent extends BaseForm implements OnInit {

  constructor(private validationService: ValidationService) {
    super('una escuela');
  }

  ngOnInit(): void {

    // Add new form controls to schools
    this.form.addControl('campusCode', new FormControl('', [Validators.required]));
    this.form.addControl('nameContact', new FormControl());
    this.form.addControl('lastNameContact', new FormControl());
    this.form.addControl('emailContact', new FormControl());
    this.form.addControl('phoneContact', new FormControl());
  }

  onSubmit() {
    this.submitted = true;

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if ( this.MODE === this.ACTION.CREATE ) {
        this.create.emit('');
      } else {
        this.edit.emit('');
      }
    } else {

      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }
}
