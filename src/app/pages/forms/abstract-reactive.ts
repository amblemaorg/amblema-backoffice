import { Input, DoCheck } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';


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

    validationErrors: object = null;

    ngDoCheck() {
        /**
         * Show the messages after submit
         */
        if ( this.control ) {
            this.validationErrors = (this.control.touched || this.control.invalid) ? this.control.errors : null;
        }
    }

}
