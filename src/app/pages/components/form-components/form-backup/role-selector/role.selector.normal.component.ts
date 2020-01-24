

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-role-selector-normal',
    template: `
    <label class="label">Roles</label>
    <select class="form-control form-group" (change)="onChange($event)">
        <option *ngFor="let item of roleList" [value]="item.name">{{ item.name }}</option>
    </select>`
})

export class RoleSelectorNormalComponent {

    @Output() selected = new EventEmitter<any>();

    roleList: any = [{ name: 'Gerente' }, { name: 'administrador' }];
    constructor() { }

    onChange(event: any) {
        this.selected.emit(event.target.value); }
}
