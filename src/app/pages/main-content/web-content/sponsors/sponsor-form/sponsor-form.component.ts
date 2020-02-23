import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styles: []
})
export class SponsorFormComponent extends BaseTable implements OnInit {

  data: any = [{
    name: 'Jose',
    lastName: 'Perez',
    description: 'Lorem',
    position: 'Empresario',
    status: 'Activo'
  }];

  ngOnInit() {

    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      position: {
        title: 'Cargo',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };

  }


}
