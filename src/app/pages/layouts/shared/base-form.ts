import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../components/form-components/shared/constant/validation-messages-list';
import { ACTION } from '../../../helpers/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class BaseForm implements OnChanges {

    /**
     * NOTE: Create a function to clear the form and
     * add values to selects
     */

    // General form
    form: FormGroup = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        password: new FormControl(),
        status: new FormControl(),
        state: new FormControl(),
        municipality: new FormControl(),
        street: new FormControl('', [Validators.required]) // Custom control
    });

    // Behavior form
    @Input() ID: string | null = null;
    @Input() MODE: string | null = ACTION.CREATE;
    @Output() edit = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();

    readonly ACTION = ACTION; // To actions
    readonly MESSAGES = MESSAGES; // <-- To customer inputs

    title = '';
    who = ''; // <-- Title modal who
    submitted = true;

    constructor(who?: string) { this.who = who ? who : 'Usuario'; }

    // To change the title mode
    ngOnChanges(): void {
        if (this.MODE === ACTION.EDIT) {
            this.title = `Editar ${this.who}`;
        } else if (this.MODE === ACTION.CREATE) {
            this.title = `Registrar ${this.who}`;
 }
    }
}
