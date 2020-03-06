import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { DetailsForm } from '../../shared/details-form';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/text-content/status';
import { DOCUMENT_TYPE } from 'src/app/helpers/document-type';
import { USER_TYPE } from 'src/app/helpers/user-type';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
})
export class CoordinatorsUsersFormComponent extends DetailsForm implements OnInit {

  constructor(private validationService: ValidationService) {
    super('un coordinador');
  }

  ngOnInit(): void {
    this.form.addControl('role', new FormControl());
    this.form.addControl('birthdate', new FormControl('', [Validators.required]));
  }

  onSubmit() {
    this.submitted = true;
    console.log( this.form.value );

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if (this.MODE === this.ACTION.CREATE) {
        this.create.emit('');
      } else {
        this.edit.emit('');
      }
    } else {

      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  // To restar nicely form
  private restar(): void {
    this.form.reset();
    this.form.controls.status.setValue(STATUS.ACTIVE.CODE);
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE);
    this.form.controls.userType.setValue(USER_TYPE.ADMIN.CODE.toString());
    this.form.controls.addressMunicipality.setValue(null);
    this.submitted = false;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
