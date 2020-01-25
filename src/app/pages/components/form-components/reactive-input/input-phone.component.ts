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
                id='phone'
                name='phone'
                type='text'
                [formControl]="control"
                autocomplete='off'
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.PHONE_MESSAGE'
                [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputPhoneComponent extends AbstractReactiveInput implements OnInit {

    ngOnInit() {
        this.control.setValidators([Validators.required, Validators.pattern(NUMBER_PATTERN)]);
    }
}
