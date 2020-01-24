

import { Component } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';

@Component({
    selector: 'app-input-custom',
    template: `
        <div class="form-group">
            <label [for]="id" *ngIf="label != ''" class="label">{{ label }} </label>
            <input
                nbInput
                fullWidth
                [type]="type"
                [name]="id"
                [id]="id"
                [formControl]="control"
                [placeholder]='placeholder'
                class="form-control form-group" />
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class InputCustomComponent extends AbstractReactiveInput {


}
