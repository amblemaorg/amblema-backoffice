import { Component, OnInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
    selector: 'app-input-document',
    template: `
        <div class="form-group">
            <label for='document' class="label">Identidad</label>
            <input
                nbInput
                fullWidth
                status="basic"
                placeholder="Identidad"
                id='document'
                name='document'
                type='text'
                [formControl]="control"
                autocomplete='off'
                class="form-control form-group" />
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputDocumentComponent extends AbstractReactiveInput implements OnInit {
    ngOnInit(): void {
        this.control.setValidators([
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(8),
            Validators.pattern(NUMBER_PATTERN)]);
    }
}
