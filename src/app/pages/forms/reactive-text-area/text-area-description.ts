import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-description',
    template: `
        <div class="form-group">
            <label for='description' class="label">Descripción</label>
            <textarea
                id='description'
                name='description'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="'Descripción'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaDescriptionComponent extends AbstractReactive {}
