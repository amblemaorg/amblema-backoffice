import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../forms/shared/constant/validation-messages-list';
import { ACTION } from '../../../helpers/text-crud';

export abstract class FormBase implements OnChanges {

    /**
     * Behavior form
     */
    @Input() ID: string | null = null;
    @Input() mode: string | null = null;

    ACTION = ACTION;
    title = '';
    object = '';

    /**
     * Event emitter the data
     */
    @Output() edit = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();

    // Base messages
    readonly MESSAGES = MESSAGES;
    submitted = false;

    constructor(object?: string) { this.object = object ? object : 'Usuario'; }

    /**
     * Change behavior
     */
    ngOnChanges(): void {
        if ( this.mode === ACTION.EDIT ) {
            this.title = `Editar ${this.object}`;
        } else if ( this.mode === ACTION.CREATE ) {
            this.title = `Registrar ${this.object}`;
        }
    }
}
