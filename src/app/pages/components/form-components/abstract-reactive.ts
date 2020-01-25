import { Input, DoCheck } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MESSAGES } from './shared/constant/validation-messages-list';

export abstract class AbstractReactive implements DoCheck {

    /**
     * 'fieldId' is a unique field identification
     * Example: 'email', 'password'
     */
    @Input() id: string | null = Math.random().toString();

    /**
     * 'control' is a reactive form validator/value controller
     *    ---REQUIRED PROPERTY---
     */
    @Input() control: AbstractControl | null = new FormControl(); // <-- Set form control if null

    /**
     * Add label or not
     */
    @Input() label: string | null =  '';

    /**
     * Custom message pattern
     */
    @Input() patternMsg: string | null = 'Formato no valido';

    @Input() placeholder: string | null = '';

    @Input() isvalidation: boolean | null = true; // <-- Show or not the messages

    @Input() submitted: boolean | null = true; // <-- Must be in false to react it after submit

    validationErrors: object = null;

    // Get messages by defect
    MESSAGES = MESSAGES;

    ngDoCheck() {
        /**
         * Show the messages after submit
         */
        if ( this.control && this.isvalidation ) {
            this.validationErrors = this.submitted && (this.control.touched || this.control.invalid) ? this.control.errors : null;
        }
    }

}
