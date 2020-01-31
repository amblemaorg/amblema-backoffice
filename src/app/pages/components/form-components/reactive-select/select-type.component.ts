import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-select-type',
    template: `
        <div class="form-group">
            <label for="type" class="label">Tipo</label>
            <select
                name="type"
                id="type"
                class="form-control form-group"
                [formControl]="control"
                (change)="onChange($event.target.value)">
                <option *ngFor="let item of types" [value]="item.value">{{ item.value }}</option>
            </select>
            <app-reactive-validation [validationErrors]="validationErrors">
            </app-reactive-validation>
        </div>
    `
})
export class SelectTypeComponent extends AbstractReactiveSelect implements OnInit {

    readonly types: any = [{ value: 'V' }, { value: 'J' }, { value: 'E' }]; // <-- Default values

    ngOnInit(): void {
        this.control.setValidators([Validators.required]);
        this.control.setValue(this.types[0].value);
    }
}
