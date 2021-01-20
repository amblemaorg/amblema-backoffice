import { AbstractReactive } from '../abstract-reactive';
import { Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class AbstractReactiveSelect extends AbstractReactive {
    @Output() onselected = new EventEmitter<any>(); // <-- Event emitter

    onChange(value: any) { this.onselected.emit(value); } // <-- Emitter value if change
}

