import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
    selector: 'app-input-document',
    template: `
        <div class="form-group">
        <label [for]="label" [hidden]="label == ''" class="label">{{label}}</label>
            <input
                nbInput
                fullWidth
                status="basic"
                [placeholder]="placeholder"
                id='document'
                name='document'
                type='text'
                [formControl]="control"
                autocomplete='off'
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control form-group" />
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputDocumentComponent extends AbstractReactiveInput implements AfterViewInit {

    constructor(private cd: ChangeDetectorRef) { super(); }

    ngAfterViewInit(): void {
        this.control.setValidators([
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(8),
            Validators.pattern(NUMBER_PATTERN)]);
        this.control.updateValueAndValidity();
        this.cd.detectChanges();
    }
}
