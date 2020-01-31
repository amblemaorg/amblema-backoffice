
import { Component, OnInit } from '@angular/core';
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
                [id]='id'
                [name]='id'
                type='email'
                [formControl]="control"
                autocomplete='off'
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.EMAIL_MESSAGE'
                [validationErrors]="validationErrors">
                </app-reactive-validation>
        </div>
    `
})

export class InputEmailComponent extends AbstractReactiveInput implements OnInit {
    ngOnInit(): void {
        this.control.setValidators([Validators.required, Validators.pattern(EMAIL_PATTERN)]);
        this.id = this.id === '' ? 'email' : this.id;
    }
}
