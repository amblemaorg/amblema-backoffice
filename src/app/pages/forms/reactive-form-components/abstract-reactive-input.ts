import { AbstractReactive } from '../abstract-reactive';
import { DoCheck, Input } from '@angular/core';

export abstract class AbstractReactiveInput extends AbstractReactive implements DoCheck {

    @Input() type: string | null = 'text'; // <-- Text, password or email
}
