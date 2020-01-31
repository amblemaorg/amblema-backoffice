import { Component, OnInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
    selector: 'app-input-phone',
    template: `
        <div class="form-group">
            <label for='phone' class="label">Télefono</label>
            <input
                nbInput
                fullWidth
                status="basic"
                placeholder="Télefono"
                [id]='id'
                [name]='id'
                type='text'
                [formControl]="control"
                autocomplete='off'
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.PHONE_MESSAGE'
                [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputPhoneComponent extends AbstractReactiveInput implements OnInit {
    ngOnInit(): void {
        this.control.setValidators([Validators.required, Validators.pattern(NUMBER_PATTERN)]);
        this.id = this.id === '' ? 'phone' : this.id;
    }
}
