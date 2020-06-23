import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-reading',
    template: `
        <div class="form-group">
            <label for='reading' class="label">Lectura</label>
            <textarea
                id='reading'
                name='reading'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="'Lectura'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaReadingComponent extends AbstractReactive { }
