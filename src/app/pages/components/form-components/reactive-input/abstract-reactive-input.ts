import { AbstractReactive } from '../abstract-reactive';
import { Input } from '@angular/core';

export abstract class AbstractReactiveInput extends AbstractReactive {
    @Input() type: string | null = '';
    @Input() max: number | null = null;
}
