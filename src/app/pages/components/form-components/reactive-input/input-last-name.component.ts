import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-input-last-name',
  template: `
    <div class="form-group">
      <label for='last-name' class="label">{{label}}</label>
      <input
        nbInput
        fullWidth
        status="basic"
        [placeholder]="placeholder"
        [id]='id'
        [name]='id'
        type='text'
        [formControl]="control"
        autocomplete='off'
        [ngClass]="{ 'is-valid' : control.valid && submitted,
        'is-invalid' : control.invalid && submitted}"
        [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
        class="form-control form-group" />
      <app-reactive-validation
        [patternMessage]='MESSAGES.LAST_NAME_MESSAGE'
        [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputLastNameComponent extends AbstractReactiveInput implements AfterViewInit {

    constructor( private cd: ChangeDetectorRef ) { super(); }

    ngAfterViewInit(): void {
      this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);
      this.control.updateValueAndValidity();

      this.id = this.id === '' ? 'last-name' : this.id;
      this.placeholder = this.placeholder === '' ? 'Apellido' : this.placeholder; 
      this.label = this.label === '' ? 'Apellido' : this.label;

      this.cd.detectChanges();
    }
}
