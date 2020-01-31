import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AbstractReactiveInput } from './abstract-reactive-input';
import { Validators } from '@angular/forms';
import { NORMAL_TEXT_PATTERN } from '../shared/constant/validation-patterns-list';

@Component({
  selector: 'app-input-name',
  template: `
    <div class="form-group">
      <label for='name' class="label">Nombre</label>
      <input
        nbInput
        fullWidth
        status="basic"
        placeholder="Nombre"
        [id]='id'
        [name]='id'
        type='text'
        [formControl]="control"
        autocomplete='off'
        [ngClass]="{ 'is-valid' : control.valid,
        'is-invalid' : control.invalid && submitted}"
        [status]=" control.valid && submitted ? 'success' : control.invalid && submitted ? 'danger' : 'basic' "
        class="form-control form-group" />
      <app-reactive-validation [patternMessage]='MESSAGES.NAME_MESSAGE' [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputNameComponent extends AbstractReactiveInput implements AfterViewInit {

  constructor( private cd: ChangeDetectorRef ) { super(); }

  ngAfterViewInit(): void {
    // Valid
    this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);
    this.control.updateValueAndValidity();


    this.id = this.id === '' ? 'name' : this.id;
    this.cd.detectChanges(); // <!-- Control change
  }
}
