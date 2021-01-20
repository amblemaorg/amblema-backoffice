import { AbstractReactive } from '../abstract-reactive';
import { Input, Directive } from '@angular/core';

@Directive()
export abstract class AbstractReactiveInput extends AbstractReactive {
    @Input() type: string | null = '';
    @Input() max: number | null = null;
}
