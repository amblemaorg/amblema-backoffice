import { BaseForm } from './base-form';
import { FormControl } from '@angular/forms';

export abstract class DetailsForm extends BaseForm {
    constructor(who?: string) {
        super(who);
        // New data related
        this.form.addControl('lastName', new FormControl());
        this.form.addControl('type', new FormControl());
        this.form.addControl('document', new FormControl());
    }
}
