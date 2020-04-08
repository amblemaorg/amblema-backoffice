import { Component, OnDestroy, OnChanges } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { BaseForm } from '../../shared/base-form';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VIDEO_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { Store, Select } from '@ngxs/store';
import { SponsorUser } from 'src/app/models/user/sponsor-user.model';
import { Subscription, Observable } from 'rxjs';
import { STATUS } from 'src/app/helpers/text-content/status';
import { SponsorUserService } from 'src/app/services/user/sponsor-user.service';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { SetSponsorUser, SponsorUserState, UpdateSponsorUser } from 'src/app/store/user-store/sponsor-user.action';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',

})
export class SponsorsUsersFormComponent extends BaseForm implements OnDestroy, OnChanges {

  @Select(SponsorUserState.sponsorUser) user$: Observable<any>;
  subscription: Subscription;

  backupOldData: SponsorUser;

  idState = ' ';
  idMunicipality = '';
  form: FormGroup;

  showProgress = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toast: CustomToastrService,
    private sponsorUserService: SponsorUserService,
    private validationService: ValidationService) {
    super('un padrino'); // <-- Title modal

    // this.type.setValue('J');

    this.form = this.fb.group({
      image: new FormControl('', [Validators.required]),
      webSite: new FormControl('', [Validators.required, Validators.pattern(VIDEO_PATTERN)]),
      name: new FormControl('', [Validators.required]),
      cardType: new FormControl('J'), // <-- Remove card type when is send it
      companyRif: new FormControl(''),
      companyPhone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      companyType: new FormControl(null),
      role: new FormControl(),
      companyOtherType: new FormControl(''),
      contactFirstName: new FormControl(),
      contactLastName: new FormControl(),
      contactPhone: new FormControl(),
      addressState: new FormControl(),
      addressMunicipality: new FormControl(),
      address: new FormControl('', [Validators.required]),
      addressCity: new FormControl('', [Validators.required]),
      status: new FormControl()
    });
  }

  ngOnChanges() {
    if (this.MODE === this.ACTION.EDIT) {

      this.subscription = this.user$.subscribe( response => {
        this.title = 'Actualizar usuario padrino';
        this.backupOldData = response;
        this.restar();
        this.form.patchValue( response );
        this.idState = this.form.controls.addressState.value;
        this.form.controls.addressState.setValue(response.addressState.id);
        this.form.controls.role.setValue(response.role.id);

        this.form.get('password').setValue(null);
        this.form.get('password').clearValidators();
        this.form.get('password').updateValueAndValidity();

      });
    } else if (this.MODE === this.ACTION.CREATE) {
      this.title = 'Registrar usuario padrino';
      this.restar();

      this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
      this.form.get('password').updateValueAndValidity();
      this.idState = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.controls.image.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para completar el registro de padrino');
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para actualizar el registro de padrino');
      }
    }

    if (this.form.valid) {
      const data: any = this.form.value;
      data.userType = USER_TYPE.SPONSOR.CODE.toString();

      delete data.cardType;

      if (this.MODE === this.ACTION.CREATE) {

        this.toast.info('Guardando', 'Enviando información, espere...');

        this.showProgress = true;

        this.sponsorUserService.getSponsorUsers().subscribe(response => { });

        this.sponsorUserService.setSponsorUser(data).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              this.store.dispatch(new SetSponsorUser(event.body));
              this.toast.registerSuccess('Registro', 'Padrino registrado satisfactoriamente');
              this.restar();
              break;
          }
        }, (err: any) => {

          this.showProgress = false;

          if (err.error.status === 0) {
            this.toast.error('Error de datos', 'Verifica los datos del formulario');
          }

          if (err.error.cardId) {
            if (String(err.error.cardId[0].status) === '5') {
              this.toast.error('Error de indentidad', 'El documento de identidad ya esta registrado');
            }
          }

          if (err.error.email) {
            if (String(err.error.email[0].status) === '5') {
              this.toast.error('Datos duplicados', 'El correo que se intenta registra ya existe.');
            }
          }
        });
      } else if ( this.MODE === this.ACTION.EDIT )  {


        const updateData: any = this.form.value;

        if (updateData.password === '' || updateData.password === null) {
          delete updateData.password;
        }
        this.showProgress = true;

        this.sponsorUserService.updateSponsorUser(this.backupOldData.id, updateData).subscribe((event: any) => {
          this.store.dispatch(new UpdateSponsorUser(this.backupOldData, event));
          this.toast.updateSuccess('Actualización', 'Usuario actualizado satisfactoriamente');
          this.submitted = false;
          this.form.get('password').setValue('');
          this.form.get('password').setValidators([]);
          this.form.get('password').updateValueAndValidity();

          setTimeout(() => {
              this.showProgress = false;
          }, 2500);

        });

      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  private restar(): void {
    this.form.reset();
    this.form.controls.cardType.setValue('J');
    this.form.controls.companyOtherType.setValue('');
    this.form.controls.companyType.setValue(null);
    this.form.controls.status.setValue(STATUS.ACTIVE.CODE);
    this.form.controls.addressMunicipality.setValue(null);
    this.submitted = false;

    setTimeout(() => {
      this.showProgress = false;
    }, 2500);
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }

}
