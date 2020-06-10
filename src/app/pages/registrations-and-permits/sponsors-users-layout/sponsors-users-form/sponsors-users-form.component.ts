import { Component, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VIDEO_PATTERN
  , NORMAL_TEXT_PATTERN
  , NUMBER_PATTERN
  , EMAIL_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';
import { Store, Select } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';
import { STATUS } from 'src/app/helpers/text-content/status';
import { SponsorUserService } from 'src/app/services/user/sponsor-user.service';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { SetSponsorUser, SponsorUserState, UpdateSponsorUser } from 'src/app/store/user-store/sponsor-user.action';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Role, DEVNAME_ROLE } from 'src/app/models/permission.model';
import { RolesState } from 'src/app/store/role.action';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sponsors-users-form',
  templateUrl: './sponsors-users-form.component.html',

})
export class SponsorsUsersFormComponent implements OnChanges, OnDestroy {

  @Input() mode: string;

  @Select(RolesState.roles) role$: Observable<Role[]>;
  @Select(SponsorUserState.sponsorUser) user$: Observable<any>;
  subscription: Subscription;

  backUpData: any;
  showProgress = false;
  submitted = false;
  idState;

  ACTION = ACTION;

  form: FormGroup = new FormGroup({
    // -- Normal data --
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    password: new FormControl(null, [Validators.required]),
    userType: new FormControl(USER_TYPE.SPONSOR.CODE.toString()),
    role: new FormControl(null, [Validators.required]),
    status: new FormControl(),

    // -- Company data --
    image: new FormControl(null),
    webSite: new FormControl(null, [Validators.required, Validators.pattern(VIDEO_PATTERN)]),
    companyRif: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    cardType: new FormControl('J'),
    companyType: new FormControl(null, [Validators.required]),
    companyOtherType: new FormControl(null),
    companyPhone: new FormControl(null, [Validators.required, Validators.pattern(NUMBER_PATTERN)]),

    // -- Contact data --
    contactFirstName: new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    contactLastName: new FormControl(null, [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    contactEmail: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    contactPhone: new FormControl(null, [Validators.required, Validators.pattern(NUMBER_PATTERN)]),

    // -- Address data --
    addressState: new FormControl(null, [Validators.required]),
    addressMunicipality: new FormControl(null, [Validators.required]),
    addressCity: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });

  constructor(
    private validatorService: ValidationService,
    private toastr: CustomToastrService,
    private store: Store,
    private sponsorUserService: SponsorUserService
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.mode.currentValue === ACTION.CREATE) {

      // -- Default role --
      this.subscription = this.role$.subscribe(response => {

        this.restar();

        this.form.get('password').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
        this.form.get('password').updateValueAndValidity();

        response.find(value => {
          if (value.devName === DEVNAME_ROLE.SPONSOR) {
            this.form.controls.role.setValue(value.id);
          }
        });
      });
    } else {

      this.subscription = this.user$.pipe(take(1)).subscribe((response: any) => {
        this.backUpData = response;

        this.form.patchValue(response);
        this.form.controls.role.setValue(response.role.id);
        this.form.controls.addressState.setValue(response.addressState.id);
        this.idState = response.addressState;
        this.form.get('password').clearValidators();
        this.form.get('password').updateValueAndValidity();
        this.form.updateValueAndValidity();

        this.form.get('companyRif').setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(9)]);
        this.form.get('companyRif').updateValueAndValidity();

      });
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {

      const data: any = this.form.value;
      data.userType = USER_TYPE.SPONSOR.CODE.toString();
      delete data.cardType; // <-- Deleting this data prevents errors

      this.toastr.info('Guardando', 'Enviando información, espere...');
      this.showProgress = true;

      if (this.mode === ACTION.CREATE) {


        this.sponsorUserService.setSponsorUser(data).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              this.store.dispatch(new SetSponsorUser(event.body));
              this.toastr.registerSuccess('Registro', 'Padrino registrado satisfactoriamente');
              this.restar();
              break;
          }
        }, (err: any) => this.errorResponse(err));

      } else {
        if (data.password === '' || data.password === null) {
          delete data.password;
        }

        this.sponsorUserService.updateSponsorUser(this.backUpData.id, data).subscribe((event: any) => {
          this.store.dispatch(new UpdateSponsorUser(this.backUpData, event));
          this.toastr.updateSuccess('Actualización', 'Usuario actualizado satisfactoriamente');
          this.submitted = false;
          this.form.get('password').reset();
          this.form.get('password').clearValidators();
          this.form.get('password').updateValueAndValidity();
        }, (err: any) => this.errorResponse(err));
      }

    } else {
      this.validatorService.markAllFormFieldsAsTouched(this.form);
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
  }

  errorResponse(err: any) {


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
  }
}
