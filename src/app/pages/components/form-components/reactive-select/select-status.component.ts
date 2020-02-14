import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';
import { STATUS } from 'src/app/helpers/status';
import { Utility } from 'src/app/helpers/utility';

@Component({
    selector: 'app-select-status',
    template: `
        <div class="form-group">
            <label for="status" class="label">Estatus</label>
            <select
                name="status"
                id="status"
                class="form-control form-group"
                [formControl]="control"
                (change)="onChange($event.target.value)">
                <option *ngFor="let item of status" [value]="item.value">{{ item.name }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})
export class SelectStatusComponent extends AbstractReactiveSelect {

    readonly status: any = [
        {
            name: STATUS.ACTIVE,
            value: '1'
        }, {
            name: STATUS.INACTIVE,
            value: '2'
        }];

    constructor( private helper: Utility ) { super(); }
}
