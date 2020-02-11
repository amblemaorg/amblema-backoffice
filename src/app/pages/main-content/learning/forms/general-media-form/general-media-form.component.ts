import { Component } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent extends BaseTable implements TableActions {

  data: any = [
    { url: 'http://www.youtube.com/', description: 'Nuevo video', status: 'Activo' }
  ];

  constructor() {
    super('form-video');

    // Chage button actions
    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // Max display
    this.settings.pager.perPage = 5;

    this.settings.columns = {
      url: {
        title: 'Video',
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

  onAction(event: any) {

  }

  newData(event: any) { }
  updateData(event: any) { }
  deleteData(event: any) { }
}
