import { Component, Input, OnChanges } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-custom',
    template: `
        <div>
            <label [for]='id' class="label">{{label}}</label>
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
                [placeholder]="placeholder"></textarea>
            <app-reactive-validation [patternMessage]='patternMsg'
            [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaCustomComponent extends AbstractReactive implements OnChanges {
    @Input() state: boolean | null = false;

    // This method listen changes, enable or disabled text area.
    ngOnChanges(): void {
        if (this.state) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }
}