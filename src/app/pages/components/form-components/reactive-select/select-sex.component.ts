import { Component, OnInit } from '@angular/core';
import { AbstractReactiveSelect } from './abstract-reactive-select';
import { SEX } from '../../../../helpers/convention/sex-type';

@Component({
  selector: 'app-select-sex',
  template: `
    <div class="form-group">
      <label for="sex" class="label">Sexo</label>
        <select
          name="sex"
          id="sex"
          class="form-control form-group"
          [formControl]="control">
            <option disabled value="null">- Seleccione el sexo -</option>
            <option *ngFor="let item of data" [value]="item.value">{{ item.data }}</option>
        </select>
      <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `,
  styles: []
})
export class SelectSexComponent extends AbstractReactiveSelect implements OnInit {

  data = [
    { value: SEX.MALE.CODE, data: SEX.MALE.MGS },
    { value: SEX.FEMALE.CODE, data: SEX.FEMALE.MGS }
  ];

  constructor() { super();  }

  ngOnInit() {
    this.control.setValue(null);
  }

}
