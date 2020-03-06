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

@Component({
  selector: 'app-coordinators-users-form',
  templateUrl: './coordinators-users-form.component.html',
})
export class CoordinatorsUsersFormComponent extends DetailsForm implements OnInit {

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
    this.form.addControl('homePhone', new FormControl( '', [Validators.required]));
    this.form.addControl('addressHome', new FormControl('', [Validators.required]));
    this.form.addControl('gender', new FormControl('', [Validators.required]));
  }

  onSubmit() {
    this.submitted = true;

    // Working on your validated form data
    if (this.form.valid) {

      // Mode
      if (this.MODE === this.ACTION.CREATE) {
        const data: CoordinatorUser = this.form.value;
        data.cardType = this.helper.encodeTypeDocument( data.cardType );
        data.userType = USER_TYPE.COORDINATOR.CODE.toString();
        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.progress = 1;

        this.coordinatorUserService.setCoordinatorUser( data ).subscribe( (event: HttpEvent<any>) => {
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
          this.progress = 0;

          console.log( err );
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
    // this.form.controls.userType.setValue(USER_TYPE.COORDINATOR.CODE.toString());
    this.form.controls.addressMunicipality.setValue(null);
    this.submitted = false;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
