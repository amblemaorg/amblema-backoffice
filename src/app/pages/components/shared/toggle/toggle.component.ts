import { Component, Input } from '@angular/core';
import { AbstractReactive } from '../../form-components/abstract-reactive';

@Component({
  selector: 'app-toggle',
  template: `
    <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input"
        [formControl]="control"
        [checked]="control.value"
        [id]="id"
        [name]="id">
      <label *ngIf="label" style="padding-top: 2px;" class="custom-control-label font-weight-bold" [for]="id">{{label}}</label>
    </div>
  `,
  styles: []
})
export class ToggleComponent extends AbstractReactive {

  constructor() {
    super();
  }
}
