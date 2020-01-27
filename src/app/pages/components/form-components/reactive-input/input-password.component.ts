
import { Component } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-input-password',
    template: `
        <div class="form-group">
            <label for='password' class="label">Contraseña</label>
            <input
                nbInput
                fullWidth
                status="basic"
                placeholder="Contraseña"
                id='password'
                name='password'
                type='password'
                [formControl]="control"
                autocomplete='off'
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.MAX_PW_MESSAGE'
                [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputPasswordComponent extends AbstractReactiveInput {
    constructor() {
        super();
        this.control.setValidators([Validators.required, Validators.maxLength(8)]);
    }
}
