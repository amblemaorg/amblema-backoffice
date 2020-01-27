import { Component, OnInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-input-last-name',
  template: `
    <div class="form-group">
      <label for='last-name' class="label">Apellido</label>
      <input
        nbInput
        fullWidth
        status="basic"
        placeholder="Apellido"
        id='last-name'
        name='last-name'
        type='text'
        [formControl]="control"
        autocomplete='off'
        class="form-control form-group" />
      <app-reactive-validation
        [patternMessage]='MESSAGES.LAST_NAME_MESSAGE'
        [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputLastNameComponent extends AbstractReactiveInput implements OnInit {
    ngOnInit(): void {
      this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);  
    }
}
