import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-input-position',
  template: `
    <div class="form-group">
      <label for='position' class="label">Cargo</label>
      <input
        nbInput
        fullWidth
        status="basic"
        placeholder="Cargo"
        id='position'
        name='position'
        type='text'
        [formControl]="control"
        autocomplete='off'
        [ngClass]="{ 'is-valid' : control.valid && submitted,
        'is-invalid' : control.invalid && submitted}"
        [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
        class="form-control form-group" />
      <app-reactive-validation [patternMessage]='MESSAGES.TEXT_MESSAGE' [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputPositionComponent extends AbstractReactiveInput implements AfterViewInit {
  constructor( private cd: ChangeDetectorRef ) {
    super();
  }

  ngAfterViewInit(): void {
    this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);
    this.control.updateValueAndValidity();

    this.cd.detectChanges();
  }
}
