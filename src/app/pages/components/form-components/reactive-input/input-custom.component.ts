import { Component, ChangeDetectorRef } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';

@Component({
    selector: 'app-input-custom',
    template: `
        <div class="form-group">
            <label [for]="label" [hidden]="label == ''" class="label">{{ label }} </label>
            <input
                nbInput
                fullWidth
                status="basic"
                [placeholder]='placeholder'
                [id]='id'
                [name]='id'
                [type]='type'
                autocomplete='off'
                [formControl]="control"
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control form-group" />
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>`
})

export class InputCustomComponent  extends AbstractReactiveInput {

    constructor( private cd: ChangeDetectorRef ) {super(); }
}
