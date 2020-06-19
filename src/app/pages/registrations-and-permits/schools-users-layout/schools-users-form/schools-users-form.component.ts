import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { BaseForm } from '../../shared/base-form';
import {
  NORMAL_TEXT_PATTERN,
  NUMBER_PATTERN,
  EMAIL_PATTERN
} from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { STATUS } from 'src/app/helpers/text-content/status';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { SetSchoolUser, SchoolUserState, UpdateSchoolUser } from 'src/app/store/user-store/school-user.action';
import { Subscription, Observable } from 'rxjs';
import { SchoolUser } from 'src/app/models/user/school.model';
import { Role, DEVNAME_ROLE } from 'src/app/models/permission.model';
import { RolesState } from 'src/app/store/role.action';

@Component({
  selector: 'app-schools-users-form',
  templateUrl: './schools-users-form.component.html',
})
export class SchoolsUsersFormComponent extends BaseForm implements OnInit, OnChanges, OnDestroy {

  @Select(RolesState.roles) role$: Observable<Role[]>;
  @Select( SchoolUserState.schoolUser ) user$: Observable<any>;
  subscription: Subscription;

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

  backupOldData: SchoolUser;
  idState = '';
  idMunicipality = '';

  showProgress = false;

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
    this.form.addControl('image', new FormControl(null));
    this.form.addControl('code', new FormControl('', [Validators.required]));
    this.form.addControl('role', new FormControl());

    // Data address
    this.form.addControl('addressCity', new FormControl('', [Validators.required]));
    this.form.addControl('addressZoneType', new FormControl(null, [Validators.required]));
    this.form.addControl('addressZone', new FormControl(null, [Validators.required]));


    // Data principal
    this.form.addControl('principalFirstName', new FormControl(''));
    this.form.addControl('principalLastName', new FormControl(''));
    this.form.addControl('principalEmail', new FormControl(''));
    this.form.addControl('principalPhone', new FormControl(''));

    // Data sub principal
    this.form.addControl('subPrincipalFirstName', new FormControl(null, [Validators.pattern(NORMAL_TEXT_PATTERN)]));
    this.form.addControl('subPrincipalLastName', new FormControl(null, [Validators.pattern(NORMAL_TEXT_PATTERN)]));
    this.form.addControl('subPrincipalEmail', new FormControl(null, [Validators.pattern(EMAIL_PATTERN)]));
    this.form.addControl('subPrincipalPhone', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));

    // Data extra school
    this.form.addControl('nTeachers', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nAdministrativeStaff', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nLaborStaff', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nStudents', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nGrades', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('nSections', new FormControl(null, [Validators.pattern(NUMBER_PATTERN)]));
    this.form.addControl('schoolShift', new FormControl());
    this.form.addControl('schoolType', new FormControl());

  }

  ngOnChanges(): void {
    if ( this.MODE === this.ACTION.EDIT ) {
      this.subscription = this.user$.subscribe( response => {
        this.title = 'Actualizar usuario escuela';

        this.backupOldData = response;

        this.restar();
        this.form.patchValue( response );
        this.idState = this.form.controls.addressState.value;
        this.idMunicipality = this.form.controls.addressMunicipality.value;
        this.form.controls.addressState.setValue(response.addressState.id);
        this.form.controls.role.setValue(response.role.id);

        this.form.get('password').setValue('');
        this.form.get('password').clearValidators();
        this.form.get('password').updateValueAndValidity();

      });
    } else if ( this.MODE === this.ACTION.CREATE ) {
      this.title = 'Registrar usuario escuela';
      this.restar();

      this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.form.get('password').updateValueAndValidity();
      this.idState = null;

      this.subscription = this.role$.subscribe(response => {
        response.find(value => {

          if (value.devName === DEVNAME_ROLE.SCHOOL) {
            this.form.controls.role.setValue(value.id);
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
      if ( this.subscription )  {
        this.subscription.unsubscribe();
      }
  }

  onSubmit() {

    this.submitted = true;

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if (this.MODE === this.ACTION.CREATE) {

        const data: any = this.form.value;
        data.userType = USER_TYPE.SCHOOL.CODE.toString();
        data.addressZoneType = data.addressZoneType.toString();

        this.toastr.info('Guardando', 'Enviando información, espere...');

        this.showProgress = true;
        this.sanitizeNoRequiredData( data );

        this.schoolUserService.setSchoolUser(data).subscribe((event: HttpEvent<any>) => {



          switch (event.type) {
            case HttpEventType.Response:

              this.store.dispatch(new SetSchoolUser(event.body));
              this.toastr.registerSuccess('Registro', 'Usuario coordinador registrado');
              this.restar();
              break;
          }
        }, (err: any) => {
          this.showProgress = false;

          if (err.error.status === 0) {
            this.toastr.error('Error de datos', 'Verifica los datos del formulario');
          }

          if ( err.error.code) {
            this.toastr.error('Error de datos', 'El código del plantel esta en uso');
          }

          if (err.error.cardId) {
            if (String(err.error.cardId[0].status) === '5') {
              this.toastr.error('Error de indentidad', 'El documento de identidad ya esta registrado');
            }
          }

          if (err.error.email) {
            if (String(err.error.email[0].status) === '5') {
              this.toastr.error('Datos duplicados', 'El correo que se intenta registra ya existe.');
            }
          }
        });
      } else if ( this.MODE === this.ACTION.EDIT ) {
        const updateData: any = this.form.value;

        if (updateData.password === '' || updateData.password === null) {
          delete updateData.password;
        }

        this.sanitizeNoRequiredData( updateData );
        this.showProgress = true;

        this.schoolUserService.updateSchoolUser(this.backupOldData.id, updateData).subscribe((event: any) => {

          this.store.dispatch(new UpdateSchoolUser(this.backupOldData, event));
          this.toastr.updateSuccess('Actualización', 'Usuario actualizado satisfactoriamente');
          this.submitted = false;
          this.form.get('password').setValue('');
          this.form.get('password').setValidators([]);
          this.form.get('password').updateValueAndValidity();

          setTimeout(() => {
              this.showProgress = false;
          }, 2100);

        }, (err: any) => {
          this.showProgress = false;

          if ( err.error.code) {
            this.toastr.error('Error de datos', 'El código del plantel esta en uso');
          }

          if ( err.error.status === 0 ) {
            this.toastr.error('Error de datos', 'Verifica los datos del formulario');
          }

          if (err.error.cardId) {
            if (String(err.error.cardId[0].status) === '5') {
              this.toastr.error('Error de indentidad', 'El documento de identidad ya esta registrado');
            }
          }

          if (err.error.email) {
            if (String(err.error.email[0].status) === '5') {
              this.toastr.error('Datos duplicados', 'El correo que se intenta registra ya existe.');
            }
          }
        });
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

    setTimeout(() => {
      this.showProgress = false;
    }, 2500);
  }

  private sanitizeNoRequiredData(data: any) {
    data.subPrincipalFirstName = data.subPrincipalFirstName === '' ? null : data.subPrincipalFirstName;
    data.subPrincipalLastName = data.subPrincipalLastName === '' ? null : data.subPrincipalLastName;
    data.subPrincipalPhone = data.subPrincipalPhone === '' ? null : data.subPrincipalPhone;
    data.subPrincipalEmail = data.subPrincipalEmail === '' ? null : data.subPrincipalEmail;
    data.nTeachers = data.nTeachers === '' ? null : data.nTeachers;
    data.nAdministrativeStaff = data.nAdministrativeStaff === '' ? null : data.nAdministrativeStaff;
    data.nLaborStaff = data.nLaborStaff === '' ? null : data.nLaborStaff;
    data.nStudents = data.nStudents === '' ? null : data.nStudents;
    data.nGrades = data.nGrades === '' ? null : data.nGrades;
    data.nSections = data.nSections === '' ? null : data.nSections;
    data.schoolShift = data.schoolShift === 'null' ? null : data.schoolShift;
    data.schoolType = data.schoolType === 'null' ? null : data.schoolType;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
