import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MESSAGES } from '../../../forms/shared/constant/validation-messages-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN, NUMBER_PATTERN, EMAIL_PATTERN } from 'src/app/pages/forms/shared/constant/validation-patterns-list';
import { ValidationService } from 'src/app/pages/forms/shared/services/validation.service';
import { ACTION } from 'src/app/helpers/text-crud';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.scss']
})
export class AdminUserFormComponent implements OnChanges {

  @Input() ID: string | null = null;
  @Input() mode: string  | null = null;

  // To set data
  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  // General modal and form settings
  title = 'Registrar usuario';
  ACTION = ACTION;
  readonly MESSAGES = MESSAGES;
  submitted = false;

  formUser: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]),
    type: new FormControl('V'),
    document: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
      Validators.pattern(NUMBER_PATTERN)]),
    position: new FormControl('', [
      Validators.required,
      Validators.pattern(NORMAL_TEXT_PATTERN),
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(NUMBER_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    role: new FormControl('', [Validators.required])
  });

  constructor( private validationService: ValidationService ) { }

  ngOnChanges(): void {
    // Mutation form
    if ( this.mode === ACTION.EDIT ) {
      this.title = 'Editar usuario';
    } else if ( this.mode === ACTION.CREATE ) {
      this.title = 'Registrar usuario';
    }
  }

  onSubmit() {
    this.submitted = true;
    // Working on your validated form data
    if (this.formUser.valid) {
      // Define act
      if ( this.mode === ACTION.CREATE ) {

        this.create.emit('');

      } else {
        this.edit.emit('');
      }
    } else {
      // Call error messages
      this.validationService.markAllFormFieldsAsTouched(this.formUser);
    }
  }
}
