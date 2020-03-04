import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-content/text-crud';
import { DetailsForm } from '../../shared/details-form';
import { Store } from '@ngxs/store';
import { SetAdminUser } from 'src/app/store/user-store/admin-user.action';
import { USER_TYPE } from 'src/app/helpers/user-type';
import { AdminUserService } from 'src/app/services/user/admin-user.service';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { DOCUMENT_TYPE } from 'src/app/helpers/document-type';
import { STATUS } from 'src/app/helpers/text-content/status';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent extends DetailsForm implements OnInit {

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

        this.adminUserService.setAdminUser(data).subscribe(response => {
          this.toastr.registerSuccess('Registro', 'Usuario administrador registrado');
          this.restar();     
        });
      } else {

      }
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  private restar () : void {
    this.form.reset(); 
    this.form.controls.status.setValue( STATUS.ACTIVE.CODE ); 
    this.form.controls.cardType.setValue(DOCUMENT_TYPE.V.VALUE); 
    this.submitted = false; 

  }

  // -- Event selected rol --
  onselected(event: any) { this.form.controls.role.setValue(event); }
}
