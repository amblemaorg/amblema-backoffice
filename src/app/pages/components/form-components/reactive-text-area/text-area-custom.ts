import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-custom',
    template: `
        <div class="form-group">
            <label [for]='id' class="label">{{label}}</label>
            <textarea
                [id]='id'
                [name]='id'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="placeholder"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaCustomComponent extends AbstractReactive {}
