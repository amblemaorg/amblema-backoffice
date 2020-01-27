import { Component, OnInit, Input } from '@angular/core';
import { AbstractReactive } from '../../form-components/abstract-reactive';

@Component({
  selector: 'app-toggle',
  template: `
    <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input"
        [formControl]="control"
        [checked]="value"
        [id]="id"
        [name]="id">
      <label class="custom-control-label" [for]="id">{{label}}</label>
    </div>
  `,
  styles: []
})
export class ToggleComponent extends AbstractReactive {

  @Input() value: boolean | null = false;

  constructor() {
    super();
  }
}
