import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { DetailsForm } from '../../shared/details-form';
import { Store } from '@ngxs/store';
import { USER_TYPE } from 'src/app/helpers/user-type';
import { AdminUserService } from 'src/app/services/user/admin-user.service';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { DOCUMENT_TYPE } from 'src/app/helpers/document-type';
import { STATUS } from 'src/app/helpers/text-content/status';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends DetailsForm implements OnInit {

  progress: number = 0;

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
    this.form.addControl('userType', new FormControl(USER_TYPE.ADMIN.CODE.toString(), [Validators.required]));
  }


  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      const data: any = this.form.value;
      data.cardType = this.helper.encodeTypeDocument(data.cardType);

      if (this.MODE === ACTION.CREATE) {
        this.toastr.info('Guardando', 'Enviando información, espere...');
        this.progress = 1;
        this.adminUserService.setAdminUser(data).subscribe((event: HttpEvent<any>) => {
        

          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              //console.log(this.progress);
              break;
            case HttpEventType.Response:
              this.progress = 0;
              this.toastr.registerSuccess('Registro', 'Usuario administrador registrado');
              this.restar();
              break;
          }
        }, (err:any) => {

          if( err.error.email.status = "5" ) {
            this.toastr.error('Datos duplicados', 'El correo que se intenta registra ya existe.');
          }
          this.progress = 0;
        });
      } else {

      }
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  private restar(): void {
    this.form.reset();
    this.form.controls.status.setValue(STATUS.ACTIVE.CODE);
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE);
    this.form.controls.userType.setValue( USER_TYPE.ADMIN.CODE.toString() ); 
    this.submitted = false;
  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
