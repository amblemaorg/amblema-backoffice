import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { BaseForm } from '../../shared/base-form';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { VIDEO_PATTERN, NUMBER_PATTERN, NORMAL_TEXT_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',

})
export class SponsorsUsersFormComponent extends BaseForm {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: CustomToastrService,
    private validationService: ValidationService) {
    super('un padrino'); // <-- Title modal

    // this.type.setValue('J');

    this.form = this.fb.group({
      image: new  FormControl('', [Validators.required]),
      webSite: new FormControl('', [Validators.required, Validators.pattern(VIDEO_PATTERN)]),
      name: new FormControl('', [Validators.required]),
      cardType: new FormControl('J'), // <-- Remove card type when is send it
      companyRIF: new FormControl(''),
      companyPhone: new FormControl('', [Validators.required, Validators.pattern( NUMBER_PATTERN )]),
      email: new FormControl(),
      password: new FormControl(),
      companyType: new FormControl(),
      companyOtherType: new FormControl(),
      contactFirstName: new FormControl(),
      contactLastName: new FormControl(),
      contactPhone: new FormControl(),
      addressState: new FormControl(),
      addressMunicipality: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      status: new FormControl()
    });
  }


  onSubmit() {
    this.submitted = true;

    console.log( this.form.value );

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
