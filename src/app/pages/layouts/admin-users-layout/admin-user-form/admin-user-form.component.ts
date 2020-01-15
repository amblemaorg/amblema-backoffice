import { Component, OnInit } from '@angular/core';
import { MESSAGES } from '../../../forms/shared/constant/validation-messages-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN, EMAIL_PATTERN } from 'src/app/pages/forms/shared/constant/validation-patterns-list';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { AbstractModalComponent } from 'src/app/pages/components/modal/abstract.modal.component';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss']
})
export class AdminUserFormComponent extends AbstractModalComponent {
  
  readonly MESSAGES = MESSAGES;
  submitted = false;
  formUser: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]), 
    lastName: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]), 
    type: new FormControl('V'),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    position: new FormControl('', [
      Validators.required,
      Validators.pattern(NORMAL_TEXT_PATTERN), 
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    role: new FormControl('', [Validators.required])
  });

  constructor( private validationService: ValidationService ) { super() }

  onSubmit() {
    this.submitted = true;

    if (this.formUser.valid) {
      // Working on your validated form data
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.formUser);
    }
  }


}
