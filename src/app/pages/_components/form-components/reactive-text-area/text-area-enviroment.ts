import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-enviroment',
    template: `
        <div class="form-group">
            <label for='enviroment' class="label">Ambiente</label>
            <textarea
                id='enviroment'
                name='enviroment'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                [placeholder]="'Ambiente'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaEnviromentComponent extends AbstractReactive {
}
