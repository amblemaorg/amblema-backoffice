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
    title = 'Registrar usuario';

    /**
     * Event emitter the data
     */
    @Output() edit = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();

    // Base messages
    readonly MESSAGES = MESSAGES;
    submitted = false;


    /**
     * Change behavior
     */
    ngOnChanges(): void {
        if ( this.mode === ACTION.EDIT ) {
            this.title = 'Editar usuario';
        } else if ( this.mode === ACTION.CREATE ) {
            this.title = 'Registrar usuario';
        }
    }
}
