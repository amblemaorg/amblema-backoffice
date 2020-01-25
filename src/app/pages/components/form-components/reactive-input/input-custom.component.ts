import { Component, OnInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';

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
                class="form-control form-group" />
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>`
})

export class InputCustomComponent  extends AbstractReactiveInput implements OnInit {
    ngOnInit(): void {
        this.control.setValidators([Validators.required]);
    }
}