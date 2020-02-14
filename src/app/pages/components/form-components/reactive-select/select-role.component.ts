import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Role } from 'src/app/models/permission.model';
import { Observable } from 'rxjs';
import { RolesState } from 'src/app/store/role.action';

@Component({
    selector: 'app-select-role',
    template: `
        <div class="form-group">
            <label for="role" class="label">Rol</label>
            <select
                name="role"
                id="role"
                class="form-control form-group"
                [formControl]="control"
                (change)="onChange($event.target.value)">
                <option *ngFor="let item of role$ | async" [value]="item.id">{{ item.name }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})
export class SelectRoleComponent extends AbstractReactiveSelect {
    @Select(RolesState.roles) role$: Observable<Role[]>;
}
