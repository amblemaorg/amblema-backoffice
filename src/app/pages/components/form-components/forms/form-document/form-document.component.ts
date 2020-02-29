import { Component, Input, AfterViewInit } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-document',
    template: `
    <div class="row">

        <div class="col">
            <app-select-type
                [off]="onlyCompany"
                [control]='controlSelect'
                [submitted]="submitted"
                (onselected)='onChangeDocument($event)'></app-select-type>
        </div>

        <div class="col-7">
            <app-input-document [control]='control' [submitted]="submitted" [patternMsg]="message"></app-input-document>
        </div>
    </div>
    `
})
export class FormDocumentComponent extends AbstractReactive implements AfterViewInit {
    @Input() controlSelect: AbstractControl | null = new FormControl();
    @Input() onlyCompany: boolean | null = false;

    message =  this.MESSAGES.DOCUMENT_MESSAGE;

    ngAfterViewInit(): void {
        if ( this.onlyCompany ) {
            this.controlSelect.setValue('J');

            this.updateDocumentValidation(8, 9);
            this.message = this.MESSAGES.RIF_MESSAGE;
        }
    }

    onChangeDocument(value: any) {

        switch (value) {
            case 'V':
                this.updateDocumentValidation(7, 8);
                this.message = this.MESSAGES.DOCUMENT_MESSAGE;
                break;
            case 'E':
                this.updateDocumentValidation(10, 10);
                this.message = this.MESSAGES.PASSPORT_MESSAGE;
                break;
            case 'J':
                this.updateDocumentValidation(8, 9);
                this.message = this.MESSAGES.RIF_MESSAGE;
                break;
        }
    }

    private updateDocumentValidation(min: number, max: number) {
        this.control.setValidators([Validators.required, Validators.minLength(min), Validators.maxLength(max)]);
        this.control.updateValueAndValidity();
    }
}
