import { Component, Input, AfterViewInit, OnChanges } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-document',
    template: `
    <div class="row">

        <div class="col-12">
            <label class="label" *ngIf="onlyCompany">RIF de la empresa</label>
        </div>
        <div class="col">
            <app-select-type
                [label]="label"
                [off]="onlyCompany"
                [control]='controlSelect'
                [submitted]="submitted"
                (onselected)='onChangeDocument($event)'></app-select-type>
        </div>

        <div class="col-7">
            <app-input-document
                [label]="labelDocument"
                [placeholder]="placeholderDocument"
                [control]='control'
                [submitted]="submitted"
                [patternMsg]="message"></app-input-document>
        </div>
    </div>
    `
})
export class FormDocumentComponent extends AbstractReactive implements OnChanges, AfterViewInit {
    @Input() controlSelect: AbstractControl | null = new FormControl();
    @Input() onlyCompany: boolean | null = false;
    @Input() mode: string | null = '';

    placeholderDocument = '';
    labelDocument = '';

    message =  this.MESSAGES.DOCUMENT_MESSAGE;

    ngOnChanges(): void {

        if ( this.mode !== '' ) {
            this.onChangeDocument( this.controlSelect.value );
        } else { this.onChangeDocument(this.controlSelect.value); }

        if ( this.onlyCompany ) {
            this.controlSelect.setValue('J');
            this.placeholderDocument = 'RIF de la empresa';
            this.updateDocumentValidation(8, 9);
            this.message = this.MESSAGES.RIF_MESSAGE;
        } else  {
            this.labelDocument = 'Identidad';
            this.placeholderDocument = 'Identidad';
            this.label = 'Tipo'; }
    }

    ngAfterViewInit(): void {
        if (this.onlyCompany) {
            this.controlSelect.setValue('J');

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
