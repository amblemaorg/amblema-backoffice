import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN, EMAIL_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

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
    this.form.addControl('image', new FormControl('')); 
    this.form.addControl('code', new FormControl('', [Validators.required])); 
    
    // Data address
    this.form.addControl('addressCity', new FormControl('', [Validators.required]));
    
    // Data principal
    this.form.addControl('principalFirstName', new FormControl(''));
    this.form.addControl('principalLastName', new FormControl(''));
    this.form.addControl('principalEmail', new FormControl(''));
    this.form.addControl('principalPhone', new FormControl('')); 

    // Data sub principal
    this.form.addControl('subPrincipalFirstName', new FormControl('', [Validators.pattern(NORMAL_TEXT_PATTERN)]));
    this.form.addControl('subPrincipalLastName', new FormControl('', [Validators.pattern(NORMAL_TEXT_PATTERN)]));
    this.form.addControl('subPrincipalEmail', new FormControl('', [Validators.pattern(EMAIL_PATTERN)])); 
    this.form.addControl('subPrincipalPhone', new FormControl('', [Validators.pattern(NUMBER_PATTERN)])); 

    // Data extra school
    this.form.addControl('nTeachers', new FormControl('', [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nAdministrativeStaff', new FormControl('', [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nLaborStaff', new FormControl('', [Validators.pattern(NUMBER_PATTERN)])); 
    this.form.addControl('nStudents', new FormControl('', [Validators.pattern(NUMBER_PATTERN)])); 
    this.form.addControl('nGrades', new FormControl('', [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nSections', new FormControl('', [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('schoolShift', new FormControl());
    this.form.addControl('schoolType', new FormControl()); 
  }

  onSubmit() {

    this.submitted = true;

    console.log( this.form.value )

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if ( this.MODE === this.ACTION.CREATE ) {
      
      } else {
      
      }
    } else {

      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }
}
