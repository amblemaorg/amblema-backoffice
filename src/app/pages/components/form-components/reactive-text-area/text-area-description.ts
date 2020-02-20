import { Component } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-description',
    template: `
        <div>
            <label [for]='id' class="label">Descripción</label>
            <textarea
                [id]='id'
                [name]='id'
                nbInput
                fullWidth
                rows="5"
                [formControl]="control"
                class="form-group"
                [ngClass]="{ 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                [placeholder]="'Descripción'"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaDescriptionComponent extends AbstractReactive {
}
