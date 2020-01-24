import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../components/form-components/shared/constant/validation-messages-list';
import { ACTION } from '../../../helpers/text-crud';

export abstract class FormBase implements OnChanges {

    /**
     * Behavior form
     */
    @Input() ID: string | null = null;
    @Input() MODE: string | null = ACTION.CREATE;

    ACTION = ACTION;
    title = '';
    object = ''; // <-- Title modal object

    /**
     * Event emitter the data
     */
    @Output() edit = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();

    readonly MESSAGES = MESSAGES; // <-- To customer inputs
    submitted = false;

    constructor(object?: string) { this.object = object ? object : 'Usuario'; }

    /**
     * Change behavior
     */
    ngOnChanges(): void {
        if ( this.MODE === ACTION.EDIT ) {
            this.title = `Editar ${this.object}`;
        } else if ( this.MODE === ACTION.CREATE ) {
            this.title = `Registrar ${this.object}`;
        }
    }
}
