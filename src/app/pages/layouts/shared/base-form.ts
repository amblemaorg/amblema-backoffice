import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../components/form-components/shared/constant/validation-messages-list';
import { ACTION } from '../../../helpers/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export abstract class BaseForm implements OnChanges {

    form: FormGroup = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        password: new FormControl(),
        status: new FormControl(),
        state: new FormControl(),
        municipality: new FormControl(),
        street: new FormControl('', [Validators.required])
    });

    // Behavior form
    @Input() ID: string | null = null;
    @Input() MODE: string | null = ACTION.CREATE;
    @Output() edit = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();

    readonly ACTION = ACTION;
    readonly MESSAGES = MESSAGES; // <-- To customer inputs

    title = '';
    who = ''; // <-- Title modal who
    submitted = false;

    constructor(who?: string) { this.who = who ? who : 'Usuario'; }

    // Change behavior and change the title
    ngOnChanges(): void {
        if (this.MODE === ACTION.EDIT) {
            this.title = `Editar ${this.who}`;
        } else if (this.MODE === ACTION.CREATE) {
            this.title = `Registrar ${this.who}`;
        }
    }
}
