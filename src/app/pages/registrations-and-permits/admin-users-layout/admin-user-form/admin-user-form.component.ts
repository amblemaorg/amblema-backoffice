import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-crud';
import { DetailsForm } from '../../shared/details-form';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends DetailsForm implements OnInit {

  constructor(private validationService: ValidationService) { super(); }

  ngOnInit(): void {
    // Add news form control
    this.form.addControl('position', new FormControl());
    this.form.addControl('role', new FormControl());
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.form.value);

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if (this.MODE === ACTION.CREATE) {
        this.create.emit('');
      } else {
        this.edit.emit('');
      }
    } else {

      // call error
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }
}
