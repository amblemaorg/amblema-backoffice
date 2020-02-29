import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-select-post-status',
  template: `
  <div class="form-group">
  <label for="status" class="label">Estatus</label>
    <select
        name="status"
        id="status"
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
export class SelectPostStatusComponent extends AbstractReactiveSelect implements OnInit {

  readonly tags = [
    { value: 'Publicado', label: 'Publicado' },
    { value: 'No publicado', label: 'No publicado' }
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.control.setValidators([Validators.required]);
    this.control.setValue(this.tags[0].value);
  }

}
