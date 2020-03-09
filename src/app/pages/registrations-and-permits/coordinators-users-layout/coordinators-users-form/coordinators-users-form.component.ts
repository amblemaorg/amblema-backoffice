import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { DetailsForm } from '../../shared/details-form';
import { FormControl, Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/text-content/status';
import { DOCUMENT_TYPE } from 'src/app/helpers/convention/document-type';
import { USER_TYPE } from 'src/app/helpers/convention/user-type';
import { CoordinatorUserService } from 'src/app/services/user/coordinator-user.service';
import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';
import { Utility } from 'src/app/helpers/utility';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { SetCoordinatorUser } from 'src/app/store/user-store/coordinator-user.action';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { NORMAL_TEXT_PATTERN } from 'src/app/pages/components/form-components/shared/constant/validation-patterns-list';

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
})
export class CoordinatorsUsersFormComponent extends DetailsForm implements OnInit {

  options = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' },
  ];
  progress = 0;

  constructor(
    private toastr: CustomToastrService,
    private store: Store,
    private helper: Utility,
    private coordinatorUserService: CoordinatorUserService,
    private validationService: ValidationService) {
    super('un coordinador');
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
    this.form.addControl('profession', new FormControl('', [Validators.pattern( NORMAL_TEXT_PATTERN )]));
    this.form.addControl('referredName', new FormControl(''));
  }


  onSubmit() {
    this.submitted = true;


    console.log( this.form.get('isReferred').value );

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

        data.userType = USER_TYPE.COORDINATOR.CODE.toString();

        console.log(data);

        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.progress = 1;

        this.coordinatorUserService.setCoordinatorUser(data).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              // console.log(this.progress);
              break;
            case HttpEventType.Response:
              this.progress = 0;
              this.store.dispatch(new SetCoordinatorUser(event.body));
              this.toastr.registerSuccess('Registro', 'Usuario coordinador registrado');
              this.restar();
              break;
          }
        }, (err: any) => {

          console.log(err);

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
          this.progress = 0;
        });

      } else {
        this.edit.emit('');
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
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE);
    this.form.controls.addressMunicipality.setValue(null);
    this.submitted = false;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
