import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { FormBase } from '../../shared/base-form';
import { NORMAL_TEXT_PATTERN, EMAIL_PATTERN, NUMBER_PATTERN } from 'src/app/pages/forms/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-schools-users-form',
  templateUrl: './schools-users-form.component.html',
  styleUrls: ['./schools-users-form.component.scss']
})
export class SchoolsUsersFormComponent extends FormBase implements OnInit {

  formSchool: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    campusCode: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),

    // Address
    state: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
 
    // Contact
    nameContact: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    lastNameContact: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    emailContact: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phoneContact: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),

    // Status
    status: new FormControl('', [Validators.required]),
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
      if ( this.mode === this.ACTION.CREATE ) {

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
