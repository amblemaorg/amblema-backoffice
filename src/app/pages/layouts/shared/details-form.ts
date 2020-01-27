import { BaseForm } from './base-form';
import { FormControl } from '@angular/forms';

export abstract class DetailsForm extends BaseForm {
    constructor() {
        super();
        this.form.addControl('lastName', new FormControl());
        this.form.addControl('type', new FormControl());
        this.form.addControl('document', new FormControl());
    }
}