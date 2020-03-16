import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges } from '@angular/core';
import { ACTION } from '../../../../helpers/text-content/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { STATUS } from 'src/app/helpers/text-content/status';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetRole, GetRoles } from 'src/app/store/role.action';
import { Role } from 'src/app/models/permission.model';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
})
export class RolesFormComponent implements OnDestroy, OnChanges {

  @Input() MODE: string | null = ACTION.CREATE;
  @Input() DATA: any | null = {};

  @Output() edit = new EventEmitter<string>();

  submitted = false;
  ACTION = ACTION;
  subscribe: Subscription;

  role: Role; // <-- To update the data

  formRole: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    status: new FormControl(STATUS.ACTIVE.MSG, [Validators.required])
  });

  constructor(
    private store: Store,
    private permissionsService: PermissionService,
    private validationService: ValidationService,
    private toastr: CustomToastrService) { }


  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  ngOnChanges(): void {

    if (this.MODE === this.ACTION.EDIT) {

      this.formRole.controls.role.setValue(this.DATA.name);
      this.formRole.controls.status.setValue( this.DATA.status === STATUS.ACTIVE.MSG ? STATUS.ACTIVE.CODE : STATUS.INACTIVE.CODE );
    } else { this.formRole.controls.status.setValue(STATUS.ACTIVE.CODE); }
  }

  onSubmit() {
    this.submitted = true;

    // Validate the form
    if (this.formRole.valid) {
      if (this.MODE === ACTION.CREATE) {

        this.subscribe = this.permissionsService.setRole(
          {
            name: this.formRole.controls.role.value,
            status: this.formRole.controls.status.value,
          }
        ).subscribe(response => {
          this.resetForm();
          this.store.dispatch(new SetRole(response));
          this.toastr.registerSuccess('Registro rol', 'Nuevo rol registrado');
        });
      } else { // <!-- Update the role
        this.subscribe = this.permissionsService.updateRole(
          this.DATA.id,
          {
            name: this.formRole.controls.role.value,
            status: this.formRole.controls.status.value,
          }
        ).subscribe( response => {
          this.submitted = false;

          // YOUT NEED TO IMPROVE THIS CODE

          this.store.dispatch( new GetRoles() );
          this.toastr.updateSuccess('Actualizar', 'Rol actualizado');
        });
      }
    } else {

      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formRole);
    }
  }

  private resetForm(): void {
    this.formRole.controls.role.reset();
    this.submitted = false;
  }
}
