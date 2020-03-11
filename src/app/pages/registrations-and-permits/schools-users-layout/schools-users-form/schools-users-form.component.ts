import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';
import {
  NORMAL_TEXT_PATTERN,
  NUMBER_PATTERN,
  EMAIL_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { STATUS } from 'src/app/helpers/text-content/status';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngxs/store';

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

  progress = 0;

  form: FormGroup;

  constructor(
    private toastr: CustomToastrService,
    private fb: FormBuilder,
    private store: Store, 
    private schoolUserService: SchoolUserService, 
    private validationService: ValidationService) {
    super('una escuela');
  }

  ngOnInit(): void {

    // Data school
    this.form.addControl('image', new FormControl(''));
    this.form.addControl('code', new FormControl('', [Validators.required]));
    this.form.addControl('role', new FormControl()); 

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

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if ( this.MODE === this.ACTION.CREATE ) {

        const data : any = this.form.value;
        data.userType = USER_TYPE.SCHOOL.CODE.toString();

        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.progress = 1;

        this.schoolUserService.setSchoolUser( data ).subscribe( (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.Response:
              this.progress = 0;

              //this.store.dispatch(new SetCoordinatorUser(event.body));
              this.toastr.registerSuccess('Registro', 'Usuario coordinador registrado');
              this.restar();
              break;
          }
        }, (err: any) => {  

        });
      } else {

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
    this.form.controls.addressMunicipality.setValue(null);
    this.submitted = false;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
