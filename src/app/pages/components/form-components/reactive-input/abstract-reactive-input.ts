import { AbstractReactive } from "../abstract-reactive";
import { Input } from '@angular/core';
import { MESSAGES } from '../shared/constant/validation-messages-list'; 

export abstract class AbstractReactiveInput extends AbstractReactive {
    @Input() type: string | null = 'text';

    // Get messages by defect
    MESSAGES = MESSAGES;
}