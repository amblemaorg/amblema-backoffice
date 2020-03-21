import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { Utility } from 'src/app/helpers/utility';
import { ModalService } from 'src/app/services/helper/modal.service';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent extends BaseTable implements OnInit {

  MODAL = 'form-project';

  data: any = [
    {
      coordinator: 'Juan',
      school: 'Simoncito',
      sponsor: 'El Padrino',
      phase: 'Inicio',
      status: '1'
    },
    {
      coordinator: 'Juan',
      school: 'Simoncito',
      sponsor: 'El Padrino',
      phase: 'Inicio',
      status: '2'
    },
  ]; // <-- Dummy variable

  /**
   * Arrow functions
   */

  valuePrepareFunction = ( row: any ) => {
    return this.helper.readlyStatus([{ status: row }])[0].status;
  }

  filterFunction = (cell?: any, search?: string) => {
    let value: string = cell === '1' ? 'Activo' : 'Inactivo';
    value = value.toUpperCase();
    if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
  }

  constructor(
    public modal: ModalService,
    private helper: Utility) { super(); }

  ngOnInit(): void {

    this.MODE = this.ACTION.CREATE;

    // Add columns
    this.settings.columns = {
      coordinator: {
        title: 'Coordinador',
        type: 'string'
      },
      school: {
        title: 'Escuela',
        type: 'string',
      },
      sponsor: {
        title: 'Padrino',
        type: 'string'
      },
      phase: {
        title: 'Fase',
        type: 'string'
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: this.valuePrepareFunction,
        filterFunction: this.filterFunction,
      }
    };
  }


  // Events table
  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:

        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.modal.open( this.MODAL );
        break;
      case this.ACTION.DELETE:
        break;
    }
  }
}