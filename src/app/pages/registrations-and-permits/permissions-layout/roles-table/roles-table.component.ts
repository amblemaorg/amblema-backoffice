import { Component, OnInit } from '@angular/core';
import { ACTION } from '../../../../helpers/text-content/text-crud';
import { Router } from '@angular/router';
import { TableActions, BaseTable } from '../../../../helpers/base-table';
import { Role } from 'src/app/models/permission.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolesState, UpdateRole, GetRoles } from 'src/app/store/role.action';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent extends BaseTable implements TableActions, OnInit {

  @Select(RolesState.roles) data$: Observable<Role[]>;
  data: any = [];

  constructor(
    private toastr: CustomToastrService,
    private service: PermissionService,
    private store: Store,
    private router: Router) {

    super('form-role'); // Related form
    this.MODE = this.ACTION.CREATE;

    // Custom columns
    this.settings.columns = {
      name: {
        title: 'Rol',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };

    // Remove view action
    this.settings.actions.custom = [
      { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];
  }

  ngOnInit(): void {

  }

  onAction(event: any) {
    switch (event.action) {
      case ACTION.EDIT:
        this.router.navigate(['/pages/permissions/actions']);
        this.store.dispatch( new UpdateRole(event.data) );
        break;
      case ACTION.DELETE:

        /**
         * RECUERDA MEJORAR ESTE CODIGO Y NO HACER DOBLE
         * PETICION, ADEMAS DE MOSTRAR UN MENSAJE DE CONFIRMACION
         * PARA ELIMINAR. Y DE ERROR PARA CUANDO UN ROL ES ASIGNADO.
         */

        this.service.deleteRole( event.data.id ).subscribe( (response) => {
          this.store.dispatch( new GetRoles() );
          this.toastr.deleteRegister( 'Elimiación', 'Rol eliminado' );
        });
        break;
    }
  }
}
