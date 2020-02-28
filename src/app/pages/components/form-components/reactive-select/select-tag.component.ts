import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-select-tag',
  template: `
    <div class="form-group">
      <label for="tag" class="label">Etiqueta</label>
        <select
          name="tag"
          id="tag"
          [formControl]="control"
          class="form-control form-group"
          (change)="onChange($event.target.value)">
            <option *ngFor="let item of tags" [value]="item.value">{{ item.label }}</option>
        </select>
      <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `,
  styles: []
})
export class SelectTagComponent extends AbstractReactiveSelect implements OnInit {
  readonly tags = [
    { value: 'Ambiente', label: 'Ambiente' }, 
    { value: 'Lectura', label: 'Lectura' },
    { value: 'Matemáticas', label: 'Matemáticas' }, 
    { value: 'otra', label: 'otra' }, 
  ]

  constructor() {
    super()
  }

  ngOnInit() {
    this.control.setValidators([Validators.required]);
    this.control.setValue(this.tags[0].value);
  }

}
