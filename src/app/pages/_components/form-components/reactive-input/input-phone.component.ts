import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
    selector: 'app-input-phone',
    template: `
        <div class="form-group">
            <label for='phone' class="label">{{label}}</label>
            <input
                nbInput
                fullWidth
                status="basic"
                [id]='id'
                [name]='id'
                type='text'
                [formControl]="control"
                [placeholder]="placeholder"
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

export class InputPhoneComponent extends AbstractReactiveInput implements AfterViewInit, OnInit {

    constructor( private cd: ChangeDetectorRef ) { super(); }

    ngOnInit(): void {
        this.placeholder = this.placeholder ? this.placeholder : 'Télefono';
    }

    ngAfterViewInit(): void {
        this.label = this.label ? this.label : 'Télefono';
        this.placeholder = this.placeholder === '' ? 'Télefono' : this.placeholder;
        this.control.setValidators([Validators.required, Validators.pattern(NUMBER_PATTERN)]);
        this.control.updateValueAndValidity();
        this.id = this.id === '' ? 'phone' : this.id;
        this.cd.detectChanges();
    }
}
