import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-math',
    template: `
        <div class="form-group">
            <label for='math' class="label">Matemática</label>
            <textarea
                id='math'
                name='math'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="'Matemática'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaMathComponent extends AbstractReactive { }
