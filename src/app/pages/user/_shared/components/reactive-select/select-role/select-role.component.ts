import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from '../_shared/abstract-reactive-select';
import { Select } from '@ngxs/store';
import { RolesState } from 'src/app/store/role.action';
import { Observable } from 'rxjs';
import { Role } from 'src/app/_models/permission.model';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent extends AbstractReactiveSelect
  implements OnInit {
  @Select(RolesState.roles) role$: Observable<Role[]>;

  roleSelected: any;

  ngOnInit(): void {
    this.roleSelected = this.control.value;
  }
}
