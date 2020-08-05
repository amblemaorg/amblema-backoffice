import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { ACTION } from '../../../../../_helpers/text-content/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/_components/form-components/shared/services/validation.service';
import { STATUS } from 'src/app/_helpers/convention/status';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { SetRole, UpdateRole, RolesState } from 'src/app/store/role.action';
import { Role } from 'src/app/_models/permission.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
})
export class RolesFormComponent implements OnDestroy, OnChanges, OnInit {

  @Select( RolesState.role ) role$: Observable<Role>;

  @Input() MODE: string | null = ACTION.CREATE;
  @Input() DATA: any | null = {};
  @Output() edit = new EventEmitter<string>();

  submitted = false;
  ACTION = ACTION;
  subscribe: Subscription;
  showProgress = false;
  permission: any;

  role: Role; // <-- To update the data


  formRole: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    status: new FormControl(STATUS.ACTIVE.VALUE, [Validators.required])
  });

  constructor(
    private store: Store,
    private permissionsService: PermissionService,
    private validationService: ValidationService,
    private toastr: CustomToastrService) { }


    ngOnInit(): void {
      this.subscribe = this.role$.subscribe( permission => this.permission = permission.permissions );
    }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  ngOnChanges(): void {
    if (this.MODE === this.ACTION.EDIT) {

      this.formRole.controls.role.setValue(this.DATA.name);
      this.formRole.controls.status.setValue(this.DATA.status === STATUS.ACTIVE.LABEL ? STATUS.ACTIVE.VALUE : STATUS.INACTIVE.VALUE);

    } else { this.formRole.controls.status.setValue(STATUS.ACTIVE.VALUE); }
  }

  onSubmit(  ) {
    this.submitted = true;

    // Validate the form
    if (this.formRole.valid) {


      if (this.MODE === ACTION.CREATE) {

        this.showProgress = true;

        this.permissionsService.setRole(
          {
            name: this.formRole.controls.role.value,
            status: this.formRole.controls.status.value,
          }
        ).subscribe((response: HttpEvent<any>) => {

          switch (response.type) {
            case HttpEventType.Response:
              this.resetForm();
              console.log( response.body );
              this.store.dispatch(new SetRole(response.body));
              this.toastr.registerSuccess('Registro rol', 'Nuevo rol registrado');
              break;
          }
        }, (err: any) => {
          this.toastr.error('Error', 'Hubo un error en el registro');
          this.showProgress = false;
          this.submitted = false;
        });
      } else { // <!-- Update the role

        this.showProgress = true;

        this.subscribe = this.permissionsService.updateRole(this.DATA.id,
          {
            name: this.formRole.controls.role.value,
            status: this.formRole.controls.status.value,
            permissions: this.permission
          }
        ).subscribe(response => {
          this.store.dispatch(new UpdateRole(response, this.DATA));
          this.submitted = false;

          setTimeout(() => {
            this.showProgress = false;
          }, 2100);
          this.toastr.updateSuccess('Actualización', 'Rol actualizado correctamente');
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
    setTimeout(() => {
      this.showProgress = false;
    }, 2500);
  }
}
