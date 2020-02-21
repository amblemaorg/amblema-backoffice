import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { DetailsForm } from '../../shared/details-form';
import { FormControl, Validators } from '@angular/forms';
import { VIDEO_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',

})
export class SponsorsUsersFormComponent extends DetailsForm implements OnInit {

  constructor(
    private toast: CustomToastrService, 
    private validationService: ValidationService) {
    super('un padrino'); // <-- Title modal
  }

  ngOnInit(): void {
    this.form.addControl('image', new FormControl('', [Validators.required]));
    this.form.addControl('url', new FormControl('', [Validators.required, Validators.pattern(VIDEO_PATTERN)]));
  }

  onSubmit() {
    this.submitted = true;

    // Error messages
    if (this.form.controls.image.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para completar el registro de padrino');
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para actualizar el registro de padrino');
      }
    }    

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
