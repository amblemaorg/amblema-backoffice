import { Component, OnInit } from "@angular/core";
import { AbstractSmartTable } from "../../../_shared/smart-table/abstract-smart-table";
import { AdminUserState } from "src/app/store/user/admin-user.action";
import { Select } from "@ngxs/store";
import { AdminUser } from "src/app/_models/user/admin-user.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-table-form-admin",
  templateUrl: "./table-form-admin.component.html",
  styleUrls: ["./table-form-admin.component.scss"],
})
export class TableFormAdminComponent extends AbstractSmartTable
  implements OnInit {
  @Select(AdminUserState.adminUsers) dataUsers$: Observable<AdminUser[]>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.settings.columns = {
      firstName: {
        title: "Nombre",
        type: "string",
      },
      lastName: {
        title: "Apellido",
        type: "string",
      },
      function: {
        title: "Cargo",
        type: "string",
      },
    };
  }

  onCustomAction(event: any) {}
}
