import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users-layout',
  template: `
    <div class="row">
      <div class="col-12">
        <nb-card>
          <nb-card-header>Usuarios administradores</nb-card-header>
          <nb-card-body>
              <app-admin-user-table></app-admin-user-table>
          </nb-card-body>
        </nb-card>
      </div>
    </div>
  `
})
export class AdminUsersLayoutComponent {}
