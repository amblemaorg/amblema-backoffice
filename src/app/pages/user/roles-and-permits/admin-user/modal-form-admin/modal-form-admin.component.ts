import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserAdminForm } from '../../../_shared/abstract-user-form';
import { FormModeService } from '../../../_services/form-mode.service';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import {
  BaseFormUser,
  FORM_MODALITY,
} from '../.././../_shared/abstract-form-mode';
import { ValidationService } from '../../../_shared/reactive-input/_shared/services/validation.service';
import { AdminUserService } from 'src/app/services/user/admin-user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { SetAdminUser } from 'src/app/store/user/admin-user.action';
import { RolesState } from 'src/app/store/role.action';
import { Role } from 'src/app/_models/permission.model';

@Component({
  selector: 'app-modal-form-admin',
  templateUrl: './modal-form-admin.component.html',
  styles: [],
})
export class ModalFormAdminComponent extends UserAdminForm
  implements BaseFormUser, OnInit, OnDestroy {
  @Select(RolesState.roles) rolesData$: Observable<Role[]>;
  subscriptionService: Subscription;

  private mode: string;

  constructor(
    private store: Store,
    private adminUserService: AdminUserService,
    private validationService: ValidationService,
    private toast: CustomToastrService,
    public formModeService: FormModeService,
    public bsModalRef: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptionService = this.formModeService
      .getMode()
      .subscribe((response) => {
        // Save mode
        this.mode = response.value;

        // -- Path values --
        if (response.value === FORM_MODALITY.EDIT.value) {
        } else {
          // -- Set role default on create
          this.subscriptionService = this.rolesData$.subscribe((roles) => {
            roles.find((role) => {
              if (role.devName === 'admin') {
                this.form.controls.role.setValue(role.id);
              }
            });
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  // -- On submit --
  onSubmit(): void {
    if (this.form.valid) {
      // -- Save new user
      if (this.mode === FORM_MODALITY.CREATE.value) {
        this.subscriptionService = this.adminUserService
          .setAdminUser(this.form.value)
          .subscribe((response: HttpEvent<any>) => {
            switch (response.type) {
              case HttpEventType.Response:
                this.store.dispatch(new SetAdminUser(response.body));
                this.toast.registerSuccess(
                  'Registro',
                  'Usuario registrado satisfactoriamente'
                );
                this.onResetForm();
                break;
            }
          });
      } else {
        // <-- Edit user admin
      }
    } else {
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  onResetForm(): void {
    this.form.reset();
  }

  onPatchValues(data: any): void {}
}
