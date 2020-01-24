import { Component, OnInit } from '@angular/core';
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
        id='name'
        name='name'
        type='text'
        [formControl]="control" 
        autocomplete='off'
        class="form-control form-group" />
      <app-reactive-validation [patternMessage]='MESSAGES.NAME_MESSAGE' [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputNameComponent extends AbstractReactiveInput implements OnInit { 
  ngOnInit(): void {
    this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);
  }
}