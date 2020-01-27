import { Input, Output } from '@angular/core';

export abstract class AbstractModalComponent {

    /**
     * Identity
     */
    @Input() ID: string;

    /**
     * Type modal
     */
    @Input() size: string | null = '';

    // Title
    @Input() title: string | null = 'Modal';

    /**
     * Render another button in the footer
     */
    @Input() extra: boolean | null = false;
}
