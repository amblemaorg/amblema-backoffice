import { Component, OnInit, OnDestroy } from "@angular/core";
import { ACTION } from "../../../../../_helpers/text-content/text-crud";
import { DomSanitizer } from "@angular/platform-browser";
import { BaseTable } from "src/app/_helpers/base-table";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { Role, Permission } from "src/app/_models/permission.model";
import { FormControl } from "@angular/forms";
import { RolesState, SelectedRole } from "src/app/store/role.action";

@Component({
  selector: "app-roles-actions",
  templateUrl: "./roles-actions.component.html",
  styles: [
    
    ` 
    .table-bordered td, .table-bordered th { border-color: #edf1f7 }
    .border-b:not(:last-child) { 
      border-bottom: 1px solid #edf1f7;
      padding-bottom: 12px;
      padding-top: 12px;
    }   
    .border-b:first-child { padding-top: 0px; }
    .border-b:last-child { padding-top: 12px; }`
  ]
})
export class RolesActionsComponent extends BaseTable
  implements OnInit, OnDestroy {
  @Select(RolesState.role) role$: Observable<Role>; // <-- Get data pre selected
  @Select(RolesState.roles) roles$: Observable<Role[]>; // <-- Get all Roles
  @Select(RolesState.actions) actions$: Observable<Permission[]>;

  subscription: Subscription;

  MODE = ACTION.EDIT;
  role: any = {}; // <-- To update only the rol
  control: FormControl = new FormControl(); // <-- Get control from rol selector

  constructor(private store: Store, private sanitizer: DomSanitizer) {
    super("form-role-action");

    this.settings.columns = {
    
      label: {
        title: "Acción",
        type: "string",
      },
      status: {
        title: "Estatus",
        filter: false,
        type: "html",
        width: "150px",
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
    this.settings.actions = false;
  }

  ngOnInit(): void {
    this.subscription = this.role$.subscribe((role) => {
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
  async onSelected(id: any) {
    this.subscription = await this.roles$.subscribe((response) => {
      return response.filter((value, key) => {
        if (value.id === id) {
          this.store.dispatch(new SelectedRole(value));
          return true;
        }
      });
    });
  }
}
