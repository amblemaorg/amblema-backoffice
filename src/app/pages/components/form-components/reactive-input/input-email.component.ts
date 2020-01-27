
import { Component } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { EMAIL_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
    selector: 'app-input-email',
    template: `
        <div class="form-group">
            <label for='email' class="label">Correo</label>
            <input
                nbInput
                fullWidth
                status="basic"
                placeholder="Correo"
                id='email'
                name='email'
                type='email'
                [formControl]="control"
                autocomplete='off'
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.EMAIL_MESSAGE'
                [validationErrors]="validationErrors">
                </app-reactive-validation>
        </div>
    `
})

export class InputEmailComponent extends AbstractReactiveInput {

    constructor() {
        super();
        this.control.setValidators([Validators.required, Validators.pattern(EMAIL_PATTERN)]);
    }
}
