import { Component, OnInit, OnDestroy } from '@angular/core';
import { ACTION } from '../../../../../_helpers/text-content/text-crud';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseTable } from 'src/app/_helpers/base-table';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/_models/permission.model';
import { FormControl } from '@angular/forms';
import { RolesState, SelectedRole } from 'src/app/store/role.action';

@Component({
  selector: 'app-roles-actions',
  templateUrl: './roles-actions.component.html',
})
export class RolesActionsComponent extends BaseTable implements OnInit, OnDestroy {

  @Select(RolesState.role) role$: Observable<Role>; // <-- Get data pre selected
  @Select(RolesState.roles) roles$: Observable<Role[]>; // <-- Get all Roles

  subscription: Subscription;

  MODE = ACTION.EDIT;
  role: any = {}; // <-- To update only the rol
  control: FormControl = new FormControl(); // <-- Get control from rol selector

  data: any = [
    { action: 'Borrar', status: 'activo' },
    { action: 'Crear', status: 'activo' }
  ];

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer) {
    super('form-role-action');

    this.settings.columns = {
      action: {
        title: 'Acción',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        filter: false,
        type: 'html',
        width: '150px',
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(`
          <div class="custom-control custom-switch text-center">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
          `);
        },
      },
    }; // End column

    // Remove view action
    this.settings.actions.custom = [
      { name: ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];
  }

  ngOnInit(): void {
    this.subscription = this.role$.subscribe(role => {
      this.role = role;
      setTimeout(() => {
        this.control.setValue(role.id); // Rol pre selected, set in the form
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // <-- Free memory
    }
  }

  // Event select another rol
  onSelected(id: any): void {

    this.subscription = this.roles$.subscribe( response => {
      return response.filter( (value, key) => {

        if ( value.id === id ) {
          this.store.dispatch( new SelectedRole( value ) );
          return true;
        }
      } );
    } );

  }
}
