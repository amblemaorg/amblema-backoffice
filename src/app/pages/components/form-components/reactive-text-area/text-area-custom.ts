import { Component, Input, OnChanges, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { AbstractReactive } from '../abstract-reactive';

@Component({
    selector: 'app-text-area-custom',
    template: `
        <div *ngIf="show && control">
            <label [for]='id' class="label">{{label}}</label>
            <textarea
                [id]='id'
                [name]='id'
                nbInput
                fullWidth
                [attr.maxLength]="max ? max : null"
                rows="5"
                [formControl]="control"
                [ngClass]="{ 'form-group' : max === null, 'is-valid' : control.valid && submitted,
                'is-invalid' : control.invalid && submitted}"
                [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
                [placeholder]="placeholder"></textarea>
                <small *ngIf="max > 0" class="mt-2 d-block label text-right"> {{ length }} / {{ max }}</small>
            <app-reactive-validation [patternMessage]='patternMsg'
            [validationErrors]="validationErrors"></app-reactive-validation>
        </div>
    `
})

export class TextAreaCustomComponent extends AbstractReactive implements AfterContentChecked {
    @Input() state: boolean | null = false;
    @Input() max: number | null = null;

    // This to max
    length = 0;
    value: string;
    show = false;

    constructor(private cd: ChangeDetectorRef) {
        super();
    }

    // This method listen changes, enable or disabled text area.
    // ngOnChanges(): void {
    //     if (this.state) {
    //         this.control.disable();
    //     } else {
    //         this.control.enable();
    //     }
    // }

    ngAfterContentChecked() {

        if (this.control) {
            this.show = true;
            if (this.max > 0) {
                this.value = this.control.value ? this.control.value : null;
                this.length = this.value ? this.value.length : 0;

            }
        }
        this.cd.detectChanges();
    }

    onType(): void {
        this.value = this.control.value;
        this.length = this.value ? this.value.length : 0;
    }
}
