import { Component } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
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
                <option *ngFor="let item of roleList" [value]="item.value">{{ item.value }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})
export class SelectRoleComponent extends AbstractReactiveSelect {

    readonly roleList: any = [{ value: 'Gerente' }, { value: 'administrador' }];

    constructor() {
        super();
        this.control.setValidators([Validators.required]);
        this.control.setValue(this.roleList[0].value);
    }
}
