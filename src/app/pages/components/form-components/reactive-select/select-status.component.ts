import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';

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
                <option *ngFor="let item of status" [value]="item.value">{{ item.value }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})
export class SelectStatusComponent extends AbstractReactiveSelect implements OnInit {

    status: any = [{ value: 'Activo' }, { value: 'Activo' }];

    ngOnInit(): void {
        this.control.setValidators([Validators.required]);
        this.control.setValue(this.status[0].value);
    }

}
