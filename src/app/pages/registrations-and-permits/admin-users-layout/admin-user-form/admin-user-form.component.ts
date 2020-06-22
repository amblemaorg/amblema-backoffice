import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/_components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { DetailsForm } from '../../shared/details-form';
import { Store, Select } from '@ngxs/store';
import { USER_TYPE } from 'src/app/_helpers/convention/user-type';
import { AdminUserService } from 'src/app/services/user/admin-user.service';
import { Utility } from 'src/app/_helpers/utility';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { DOCUMENT_TYPE } from 'src/app/_helpers/convention/document-type';
import { STATUS } from 'src/app/_helpers/text-content/status';
import { SetAdminUser, AdminUserState, UpdateAdminUser } from 'src/app/store/user-store/admin-user.action';
import { Observable, Subscription } from 'rxjs';
import { AdminUser } from 'src/app/_models/user/admin-user.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { RolesState } from 'src/app/store/role.action';
import { Role, DEVNAME_ROLE } from 'src/app/_models/permission.model';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends DetailsForm implements OnInit, OnChanges, OnDestroy {

  @Select(RolesState.roles) role$: Observable<Role[]>;
  @Select(AdminUserState.adminUser) user$: Observable<any>;
  subscription: Subscription;

  idState = ' ';
  idMunicipality = '';
  backupOldData: AdminUser;
  mode = '';

  showProgress = false;

  constructor(
    private store: Store,
    private helper: Utility,
    private toastr: CustomToastrService,

    private adminUserService: AdminUserService,
    private validationService: ValidationService) { super(); }

  ngOnInit(): void {
    // Add news form control
    this.form.addControl('function', new FormControl());
    this.form.addControl('role', new FormControl());
    this.form.removeControl('name');
    this.form.addControl('userType', new FormControl(USER_TYPE.ADMIN.VALUE, [Validators.required]));
  }

  ngOnChanges(): void {
    if (this.MODE === this.ACTION.EDIT) {
      this.subscription = this.user$.subscribe(response => {

        // Title modal
        this.title = 'Actualizar usuario administrador';

        // -- Prepare data in the form to update
        this.form.patchValue(response);
        this.idState = this.form.controls.addressState.value;
        this.idMunicipality = this.form.controls.addressMunicipality.value;
        this.form.controls.addressState.setValue(response.addressState.id);
        this.form.controls.role.setValue(response.role.id);
        this.submitted = false;

        this.backupOldData = response;


        this.form.get('password').setValue('');
        this.form.get('password').setValidators([]);
        this.form.get('password').updateValueAndValidity();

        this.mode = 'something'; // <-- Indicate to the form document to update

      });
    } else if (this.MODE === this.ACTION.CREATE) {

      this.mode = '';
      this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.form.get('password').updateValueAndValidity();

      this.idState = null;
      this.restar(); // To restar form
      // Title modal
      this.title = 'Registrar usuario administrador';

      this.subscription = this.role$.subscribe(response => {
        response.find(value => {

          if (value.devName === DEVNAME_ROLE.ADMIN) {
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

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      const data = this.form.value;

      // Enconde the type document if necesary
      if (data.cardType === DOCUMENT_TYPE.E.VALUE ||
        data.cardType === DOCUMENT_TYPE.J.VALUE ||
        data.cardType === DOCUMENT_TYPE.V.VALUE) {
        data.cardType = this.helper.encodeTypeDocument(data.cardType);
      }

      if (this.MODE === ACTION.CREATE) {
        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.showProgress = true;

        this.adminUserService.setAdminUser(data).subscribe((response: HttpEvent<any>) => {

          switch (response.type) {
            case HttpEventType.Response:
              this.store.dispatch(new SetAdminUser(response.body));
              this.toastr.registerSuccess('Registro', 'Usuario registrado satisfactoriamente');
              this.restar();
              break;
          }
        }, (err: any) => {
          this.showProgress = false;
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
      } else {

        /** Update admin user data */

        const updateData: any = this.form.value;

        if (updateData.cardType === 'V' || updateData.cardType === 'E' || updateData.cardType === 'J') {
          updateData.cardType = this.helper.encodeTypeDocument(updateData.cardType);
        }

        if (updateData.password === '' || updateData.password === null) {
          delete updateData.password;
        }

        this.showProgress = true;

        this.adminUserService.updateAdminUser(this.backupOldData.id, updateData).subscribe((event: any) => {

          event = this.helper.readlyTypeDocument([event])[0];

          this.store.dispatch(new UpdateAdminUser(this.backupOldData, event));
          this.toastr.updateSuccess('Actualización', 'Usuario actualizado satisfactoriamente');
          this.submitted = false;

          this.form.get('password').setValue('');
          this.form.get('password').setValidators([]);
          this.form.get('password').updateValueAndValidity();

          setTimeout(() => {
            this.showProgress = false;
          }, 2100);

        });

      }
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  // To restar nicely form
  private restar(): void {
    this.form.reset();
    this.form.controls.status.setValue(STATUS.ACTIVE.CODE);
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE);
    this.form.controls.userType.setValue(USER_TYPE.ADMIN.VALUE);
    this.form.controls.addressMunicipality.setValue(null);
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
