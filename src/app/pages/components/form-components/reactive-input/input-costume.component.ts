import { Component } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';

@Component({
    selector: 'app-input-costume',
    template: `
        <div class="form-group">
            <label [for]="label" *ngIf="label != ''" class="label">{{ label }} </label>
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

export class InputCostumeComponent  extends AbstractReactiveInput { }