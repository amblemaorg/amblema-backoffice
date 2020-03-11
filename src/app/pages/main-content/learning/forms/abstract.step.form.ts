import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ACTION } from '../../../../helpers/text-content/text-crud';
import { Input } from '@angular/core';


export abstract class AbtractStepForm {

    // General form
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
    });

    ACTION = ACTION;

    // Behavior form
    @Input() MODE: string | null = ACTION.CREATE;
}
