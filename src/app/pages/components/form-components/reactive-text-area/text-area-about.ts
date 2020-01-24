import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-about',
    template: `
        <div class="form-group">
            <label for='about' class="label">Texto sobre nosotros</label>
            <textarea
                id='about'
                name='about'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="'Texto sobre nosotros'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaAboutComponent extends AbstractReactive {
}
