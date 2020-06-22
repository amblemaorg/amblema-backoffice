import { Component } from '@angular/core';

@Component({
  selector: 'app-coordinators-users-layouts',
  template: `
    <div class="row">
      <div class="col-12">
          <nb-card>
            <nb-card-header>Coordinadores</nb-card-header>
            <nb-card-body>
              <app-coordinators-users-table></app-coordinators-users-table>

            </nb-card-body>
          </nb-card>
      </div>
    </div>
  `
})
export class CoordinatorsUsersLayoutsComponent {
  constructor() {}
}
