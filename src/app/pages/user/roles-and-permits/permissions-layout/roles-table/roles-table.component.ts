import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../../_helpers/text-content/text-crud';
import { Router } from '@angular/router';
import { TableActions, BaseTable } from '../../../../../_helpers/base-table';
import { Role } from 'src/app/_models/permission.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  RolesState,
  DeleteRole,
  SelectedRole,
} from 'src/app/store/role.action';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent extends BaseTable
  implements TableActions, OnInit {
  @Select(RolesState.roles) data$: Observable<Role[]>;

  data: any = [];

  constructor(
    private toastr: CustomToastrService,
    private modalService: BsModalService,
    private service: PermissionService,
    private store: Store,
    private router: Router
  ) {
    super('form-role'); // Related form
    this.MODE = this.ACTION.CREATE;

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Rol',
        type: 'string',
      },
      status: {
        title: 'Estatus',
        type: 'string',
      },
    };

    // Remove view action
    this.settings.actions.custom = [
      { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];
  }

  ngOnInit(): void {}

  onAction(event: any) {
    switch (event.action) {
      case ACTION.EDIT:
        this.router.navigate(['/pages/permissions/actions']);
        this.store.dispatch(new SelectedRole(event.data));
        break;
      case ACTION.DELETE:
        // -- Instance delete

        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar rol',
          '¿Desea eliminar el rol seleccionado?',
          `Si hay usuarios, que tengan designado este rol,
           tendras que modifcarlo antes de eliminar. Los roles estandares no se pueden eliminar.`
        );

        (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              // -- when pressed Yes

              this.service.deleteRole(event.data.id).subscribe(
                (response) => {
                  this.store.dispatch(new DeleteRole(event.data));
                  (modal.content as DialogConfirmationComponent).hideConfirmationModal();
                },
                (err: any) => {
                  (modal.content as DialogConfirmationComponent).errorDelete(
                    err,
                    'Hay usuarios que tienen el rol seleccionado'
                  );

                  if (event.data.isStandard) {
                    this.toastr.error(
                      'Error',
                      'No puedes eliminar un rol estandarizado'
                    );
                  }
                }
              );
            } else if (result === false) {
              // -- when pressed No
            } else {
              // -- When closing the modal without no or yes
            }
          }
        );
        break;
    }
  }
}
