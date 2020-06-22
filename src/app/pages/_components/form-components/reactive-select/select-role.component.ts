import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Select } from '@ngxs/store';
import { Role } from 'src/app/_models/permission.model';
import { Observable } from 'rxjs';
import { RolesState } from 'src/app/store/role.action';
import { Validators } from '@angular/forms';

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
                <option disabled selected [value]="null">- Seleccione un rol -</option>
                <option *ngFor="let item of role$ | async" [value]="item.id">{{ item.name }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})
export class SelectRoleComponent extends AbstractReactiveSelect implements OnInit {
    @Select(RolesState.roles) role$: Observable<Role[]>;

    ngOnInit(): void {
        this.control.setValidators([Validators.required]);
        this.control.setValue(null);
    }
}
