import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { DetailsForm } from '../../shared/details-form';
import { FormControl, Validators } from '@angular/forms';
import { VIDEO_PATTERN, NUMBER_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',

})
export class SponsorsUsersFormComponent extends DetailsForm implements OnInit {

  constructor(private validationService: ValidationService) {
    super('un padrino'); // <-- Title modal
  }

  ngOnInit(): void {
    this.form.addControl('image', new FormControl('', [Validators.required]));
    this.form.addControl('url', new FormControl('', [Validators.required, Validators.pattern(VIDEO_PATTERN)]));
  }

  onSubmit() {
    this.submitted = true;

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

}
