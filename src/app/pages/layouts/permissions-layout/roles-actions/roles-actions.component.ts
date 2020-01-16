import { Component } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';

@Component({
  selector: 'app-roles-actions',
  templateUrl: './roles-actions.component.html',
  styleUrls: ['./roles-actions.component.scss']
})
export class RolesActionsComponent {

  mode = ACTION.EDIT;

  constructor() { }
}
