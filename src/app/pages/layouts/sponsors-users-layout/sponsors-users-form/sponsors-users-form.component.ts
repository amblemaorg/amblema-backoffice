import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBase } from '../../shared/base-form';
import { NORMAL_TEXT_PATTERN, EMAIL_PATTERN, NUMBER_PATTERN } from 'src/app/pages/forms/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',
  styleUrls: ['./sponsors-users-form.component.scss']
})
export class SponsorsUsersFormComponent extends FormBase implements OnInit {

  formSponsor: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    type: new FormControl('V'),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    status: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
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
      if ( this.mode === this.ACTION.CREATE ) {

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
