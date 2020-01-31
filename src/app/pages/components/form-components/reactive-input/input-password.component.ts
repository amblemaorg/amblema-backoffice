
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control form-group" />
            <app-reactive-validation
                [patternMessage]='MESSAGES.MAX_PW_MESSAGE'
                [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputPasswordComponent extends AbstractReactiveInput implements AfterViewInit {

    constructor( private cd: ChangeDetectorRef ) { super(); }

    ngAfterViewInit(): void {
        this.control.setValidators([Validators.required, Validators.maxLength(8)]);
        this.control.updateValueAndValidity();

        this.cd.detectChanges();
    }
}
