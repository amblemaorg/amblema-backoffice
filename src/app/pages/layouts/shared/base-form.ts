import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../components/form-components/shared/constant/validation-messages-list';
import { ACTION } from '../../../helpers/text-crud';

export abstract class BaseForm implements OnChanges {   
    

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
        if ( this.MODE === ACTION.EDIT ) {
            this.title = `Editar ${this.who}`;
        } else if ( this.MODE === ACTION.CREATE ) {
            this.title = `Registrar ${this.who}`;
        }
    }
}
