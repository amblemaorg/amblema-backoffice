import { Component, OnInit } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseTable implements TableActions {

  data: any = [{
    image: 'Imagen de muestra',
    description: 'Descripcion de la imagen',
    status: 'activo'
  }];

  constructor() {
    super('');

    // Chage button actions
    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // Max display
    this.settings.pager.perPage = 5;

    // Custome
    this.settings.columns = {
      image: {
        title: 'Imagen',
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

  onAction(event: any): void { }
  newData(): void { }
  updateData(): void { }
  deleteData(): void { }
}
