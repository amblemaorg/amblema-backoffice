import { Component, ChangeDetectorRef, AfterViewInit, DoCheck, AfterContentChecked } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';

@Component({
    selector: 'app-input-custom',
    template: `
        <div class="form-group" *ngIf="show">
            <label [for]="label" [hidden]="label == ''" class="label">{{ label }} </label>
            <input
                nbInput
                fullWidth
                status="basic"
                [placeholder]='placeholder'
                [id]='id'
                [name]='id'
                [attr.maxLength]="max ? max : null"
                [type]='type'
                autocomplete='off'
                (keyup)="onType()"
                [formControl]="control"
                [ngClass]="{ 'form-group' : max === null, 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                class="form-control" />
                <small *ngIf="max > 0" class="mt-2 d-block label text-right"> {{ length }} / {{ max }}</small>
            <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>
        </div>`
})

export class InputCustomComponent  extends AbstractReactiveInput implements AfterContentChecked {

    length = 0;
    value: string;

    show = false;

    constructor( private cd: ChangeDetectorRef ) {super(); }

    ngAfterContentChecked() {
        this.show = true;
        this.value = this.control.value;
        this.length = this.value ? this.value.length : 0;
        this.cd.detectChanges();
    }

    onType(): void {
        this.value = this.control.value;
        this.length = this.value ? this.value.length : 0;
    }
}
