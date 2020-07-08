import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserAdminForm } from '../../../_shared/abstract-user-form';
import { FormModeService } from '../../../_services/form-mode.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  BaseFormUser,
  FORM_MODALITY,
} from '../.././../_shared/abstract-form-mode';
import { ValidationService } from '../../../_shared/reactive-input/_shared/services/validation.service';

@Component({
  selector: 'app-modal-form-admin',
  templateUrl: './modal-form-admin.component.html',
  styles: [],
})
export class ModalFormAdminComponent extends UserAdminForm
  implements BaseFormUser, OnInit, OnDestroy {
  subscriptionService: Subscription;

  constructor(
    private store: Store,
    private validationService: ValidationService,
    public formModeService: FormModeService,
    public bsModalRef: BsModalRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptionService = this.formModeService
      .getMode()
      .subscribe((response) => {
        // -- Path values --
        if (response.value === FORM_MODALITY.EDIT.value) {
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
    } else {
      console.log('formulario no validado');
      this.validationService.markAllFormFieldsAsTouched(this.form);
    }
  }

  onResetForm(): void {}

  onPatchValues(data: any): void {}
}
