import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ACTION } from '../../../../helpers/text-crud';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/pages/components/form-components/shared/services/validation.service';
import { STATUS } from 'src/app/helpers/status';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent {

  @Input() MODE: string | null = ACTION.CREATE;
  @Input() data: any;

  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  submitted = false;
  ACTION = ACTION;

  formRole: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    status: new FormControl(STATUS.ACTIVE, [Validators.required])
  });

  constructor( private validationService: ValidationService ) { }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formRole.valid) {
      // Define act

    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formRole);
    }
  }
}
