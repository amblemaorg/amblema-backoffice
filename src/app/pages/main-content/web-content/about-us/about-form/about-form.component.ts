import { Component, OnInit } from '@angular/core';
import { AbstractPageTable } from '../../_helpers/abstract.page.table';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
})
export class AboutFormComponent extends AbstractPageTable implements OnInit {

  data: any = [{
    title: 'Honores',
    firstDescription: 'Lorem',
    secondDescription: 'Lorem',
    status: 'Activo'
  }];

  ngOnInit() {
    this.settings.columns = {
      title: {
        title: 'Titulo',
        type: 'string'
      },
      firstDescription: {
        title: 'Primera Descripción',
        type: 'string'
      },
      secondDescription: {
        title: 'Segunda Descripción',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string'
      }
    };
  }

}
