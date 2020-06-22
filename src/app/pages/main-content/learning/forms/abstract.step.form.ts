import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ACTION } from '../../../../_helpers/text-content/text-crud';
import { Input } from '@angular/core';


export abstract class AbtractStepForm {

    // General form
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        title: new FormControl('', [Validators.required, Validators.maxLength(140)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(2800)])
    });

    ACTION = ACTION;

    // Behavior form
    @Input() MODE: string | null = ACTION.CREATE;
}
