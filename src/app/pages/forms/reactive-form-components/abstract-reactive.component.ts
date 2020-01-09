import { DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export abstract class AbstractReactiveComponent implements DoCheck {

    /**
     * 'fieldId' is a unique field identification
     * Example: 'email', 'password'
     */
    @Input() fieldId: string | null = Math.random().toString();

    /**
     * 'control' is a reactive form validator/value controller
     *    ---REQUIRED PROPERTY---
     */
    @Input() control: AbstractControl | null = null;

    /**
     * type of reaction, if you set
     * false then the messages will be displayed after submit
     */
    @Input() submitted: boolean | null = true;

    /**
     * Add label or not
     */
    @Input() label: string | null =  '';

    /**
     * Custom message pattern
     */
    @Input() patternMessage: string | null = 'Formato no valido';

    /**
     * Set the input type, 'text' by defect
     */
    @Input() type: string | null = 'text';

    validationErrors: object = null;

    ngDoCheck() {
        /**
         * Show the messages after submit
         */
        this.validationErrors = this.submitted && (this.control.touched || this.control.invalid) ? this.control.errors : null;
    }
}
