import { Input } from '@angular/core';

export abstract class AbstractStep {

    @Input() id: string;
    @Input() label: string;
    @Input() status: boolean; // <-- Content active

    enableTextArea = true;

    abstract onClick(): void;
}
