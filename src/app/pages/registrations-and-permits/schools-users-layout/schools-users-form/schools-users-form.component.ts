import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';

@Component({
  selector: 'app-schools-users-form',
  templateUrl: './schools-users-form.component.html',
})
export class SchoolsUsersFormComponent extends BaseForm implements OnInit {

  classTime = [
    { value: '1', label: 'Mañana' },
    { value: '2', label: 'Tarde' },
    { value: '3', label: 'Ambos' },
  ];

  typeSchool = [
    { value: '1', label: 'Nacional' }, 
    { value: '2', label: 'Estadal' },
    { value: '3', label: 'Municipal' },
  ]; 
  
  form: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService) {
    super('una escuela');
  }

  ngOnInit(): void {

    // Data school
    this.form.addControl('image', new FormControl('', [Validators.required])); 
    this.form.addControl('code', new FormControl('', [Validators.required])); 
  }

  onSubmit() {

    console.log( this.form.value )

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
