import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { STATUS } from 'src/app/helpers/status';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetRole } from 'src/app/store/role.action';
import { Role } from 'src/app/models/permission.model';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
})
export class RolesFormComponent implements OnDestroy, OnChanges {

  @Input() DATA: boolean | null = false;
  @Input() MODE: string | null = ACTION.CREATE;

  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  submitted = false;
  ACTION = ACTION;

  subscribe: Subscription;

  formRole: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    status: new FormControl(STATUS.ACTIVE, [Validators.required])
  });

  constructor(
    private store: Store,
    private permissionsService: PermissionService,
    private validationService: ValidationService,
    private toastr: CustomToastrService) { }

  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe();
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.MODE);
    console.log(this.DATA);
  }
  
  onSubmit() {
    this.submitted = true;

    // Validate the form
    if (this.formRole.valid) {

      if (this.MODE === ACTION.CREATE) {

        this.subscribe = this.permissionsService.setRole({ name: this.formRole.controls.role.value }).subscribe(response => {
          this.resetForm();
          this.store.dispatch(new SetRole(response));
          this.toastr.registerSuccess('Registro rol', 'Nuevo rol registrado');
        });
      } else { // <!-- Update the role 

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
