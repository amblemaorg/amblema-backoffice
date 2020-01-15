import { Input } from '@angular/core';

export abstract class AbstractModalComponent {

    /**
     * Identity
     */
    @Input('ID') ID: string;

    /**
     * Type modal 
     */
    @Input() size: string | null = '';

    // Title
    @Input() title: string | null = 'Modal';


}