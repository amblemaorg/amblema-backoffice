import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ValidationService } from 'src/app/pages/_components/form-components/shared/services/validation.service';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/_helpers/convention/status';
import { DOCUMENT_TYPE } from 'src/app/_helpers/convention/document-type';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { CoordinatorUserService } from 'src/app/services/user/coordinator-user.service';
import { CoordinatorUser } from 'src/app/_models/user/coordinator-user.model';
import { Utility } from 'src/app/_helpers/utility';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { SetCoordinatorUser, CoordinatorUserState, UpdateCoordinatorUser } from 'src/app/store/user/coordinator-user.action';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { NORMAL_TEXT_PATTERN } from 'src/app/pages/_components/form-components/shared/constant/validation-patterns-list';
import { Observable, Subscription } from 'rxjs';
import { Role, DEVNAME_ROLE } from 'src/app/_models/permission.model';
import { RolesState } from 'src/app/store/role.action';
import { DetailsForm } from '../../../_shared/details-form';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
})
export class CoordinatorsUsersFormComponent extends DetailsForm implements OnInit, OnChanges, OnDestroy {

  @Select(RolesState.roles) role$: Observable<Role[]>;
  @Select(CoordinatorUserState.coordinatorUser) user$: Observable<any>;
  subscription: Subscription;

  options = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' },
  ];

  backupOldData: CoordinatorUser;

  showProgress = false;

  idState = ' ';
  idMunicipality = '';

  constructor(
    private toastr: CustomToastrService,
    private store: Store,
    private helper: Utility,
    private coordinatorUserService: CoordinatorUserService,
    private validationService: ValidationService) {
    super('un coordinador');
  }

  ngOnChanges(): void {

    
    if (this.MODE === this.ACTION.EDIT) {
      this.subscription = this.user$.subscribe(response => {
        this.title = 'Actualizar usuario coordinador';

        this.backupOldData = response;

        this.restar();
        this.form.patchValue(response);
        this.form.controls.birthdate.setValue(new Date(this.backupOldData.birthdate.toString()));
        this.idState = this.form.controls.addressState.value;
        // this.idMunicipality = this.form.controls.addressMunicipality.value;
        this.form.controls.addressState.setValue(response.addressState.id);
        this.form.controls.addressMunicipality.setValue(
          response.addressMunicipality.id
        );
        this.form.controls.role.setValue(response.role.id);

        this.form.get('password').setValue('');
        this.form.get('password').clearValidators();
        this.form.get('password').updateValueAndValidity();

      });
    } else if (this.MODE === this.ACTION.CREATE) {
      this.title = 'Registrar usuario coordinador';
      this.restar();

      this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.form.get('password').updateValueAndValidity();
      this.idState = null;


      this.subscription = this.role$.subscribe(response => {
        response.find(value => {

          if (value.devName === DEVNAME_ROLE.COORDINADOR) {
            this.form.controls.role.setValue(value.id);
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form.addControl('role', new FormControl());
    this.form.addControl('addressCity', new FormControl('', [Validators.required]));
    this.form.addControl('addressHome', new FormControl('', [Validators.required]));
    this.form.addControl('birthdate', new FormControl('', [Validators.required]));
    this.form.addControl('homePhone', new FormControl('', [Validators.required]));
    this.form.addControl('addressHome', new FormControl('', [Validators.required]));
    this.form.addControl('gender', new FormControl('', [Validators.required]));

    // New data no required
    this.form.addControl('image', new FormControl(null));
    this.form.addControl('isReferred', new FormControl(false, []));
    this.form.addControl('profession', new FormControl(null, [Validators.pattern(NORMAL_TEXT_PATTERN)]));
    this.form.addControl('referredName', new FormControl(null, []));
  }


  onSubmit() {
    this.submitted = true;

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if (this.MODE === this.ACTION.CREATE) {
        const data: CoordinatorUser = this.form.value;


        // Enconde the type document if necesary
        if (data.cardType === DOCUMENT_TYPE.E.VALUE ||
          data.cardType === DOCUMENT_TYPE.J.VALUE ||
          data.cardType === DOCUMENT_TYPE.V.VALUE) {
          data.cardType = this.helper.encodeTypeDocument(data.cardType);
        }

        data.userType = USER_TYPE.COORDINATOR.VALUE;

        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.showProgress = true;


        this.coordinatorUserService.setCoordinatorUser(data).subscribe((event: HttpEvent<any>) => {

          switch (event.type) {
            case HttpEventType.Response:
              this.store.dispatch(new SetCoordinatorUser(event.body));
              this.toastr.registerSuccess('Registro', 'Usuario coordinador registrado');
              this.restar();
              break;
          }
        }, (err: any) => {

          this.showProgress = false;

          if (err.error.status === 0) {
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
        }, () => { });

      } else if (this.MODE === this.ACTION.EDIT) {
        /** Update admin user data */

        const updateData: any = this.form.value;

        if (updateData.cardType === 'V' || updateData.cardType === 'E' || updateData.cardType === 'J') {
          updateData.cardType = this.helper.encodeTypeDocument(updateData.cardType);
        }

        if (updateData.password === '' || updateData.password === null) {
          delete updateData.password;
        }

        this.showProgress = true;

        this.coordinatorUserService.updateCoordinatorUser(this.backupOldData.id, updateData).subscribe((event: any) => {
          event = this.helper.readlyTypeDocument([event])[0];

          this.store.dispatch(new UpdateCoordinatorUser(this.backupOldData, event));
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

          if (err.error.status === 0) {
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
        }, () => { });
      }
    } else {

      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  // To restar nicely form
  private restar(): void {
    this.form.reset();
    this.form.controls.status.setValue(STATUS.ACTIVE.VALUE);
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE);
    this.form.controls.addressMunicipality.setValue(null);
    this.form.controls.isReferred.setValue(false);
    this.submitted = false;

    setTimeout(() => {
      this.showProgress = false;
    }, 2500);
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }

  onPress() {
    if (this.MODE === this.ACTION.EDIT && this.form.controls.password.value !== null) {
      this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.form.get('password').updateValueAndValidity();
    }

    if (this.MODE === this.ACTION.EDIT && this.form.controls.password.value === '') {
      this.form.get('password').setValidators([]);
      this.form.get('password').updateValueAndValidity();

    }
  }
}
