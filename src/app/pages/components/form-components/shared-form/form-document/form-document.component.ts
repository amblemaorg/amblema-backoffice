import { Component, Input } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-document',
    templateUrl: './form-document.component.html'
})
export class FormDocumentComponent extends AbstractReactive {
    @Input() controlSelect: AbstractControl | null = new FormControl();

    message =  this.MESSAGES.DOCUMENT_MESSAGE;

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
