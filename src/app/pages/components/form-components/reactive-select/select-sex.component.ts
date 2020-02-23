import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-sex',
  template: `
    <div class="form-group">
      <label for="sex" class="label">Sexo</label>
        <select
          name="sex"
          id="sex"
          class="form-control form-group"

          (change)="onChange($event.target.value)">
          <option disabled value="- Seleccion el sexo -">- Seleccione el sexo -</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      <app-reactive-validation [validationErrors]="validationErrors"></app-reactive-validation>
    </div>
  `,
  styles: []
})
export class SelectSexComponent implements OnInit {

  // RECUERDA AGREGARLO EL CONTROLNAME

  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {

  }
}
