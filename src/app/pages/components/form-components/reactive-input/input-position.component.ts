import { Component, OnInit } from '@angular/core';
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
        class="form-control form-group" />
      <app-reactive-validation [patternMessage]='MESSAGES.TEXT_MESSAGE' [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `
})
export class InputPositionComponent extends AbstractReactiveInput implements OnInit { 
  ngOnInit(): void {
    this.control.setValidators([Validators.required, Validators.pattern(NORMAL_TEXT_PATTERN)]);
  }
}