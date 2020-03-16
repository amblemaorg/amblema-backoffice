import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { Utility } from 'src/app/helpers/utility';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent extends BaseTable implements OnInit {

  data: any = [
    {
      coordinator: 'Juan',
      school: 'Simoncito',
      sponsor: 'El Padrino',
      phase: 'Inicio',
      status: 'Activo'
    }
  ]; // <-- Dummy variable

  constructor(private helper: Utility) { super(); }

  ngOnInit(): void {
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
        valuePrepareFunction: (row: any) => {
          return this.helper.readlyStatus([{ status: row }])[0].status;
        },
        filterFunction(cell?: any, search?: string): boolean {
          let value: string = cell === '1' ? 'Activo' : 'Inactivo';
          value = value.toUpperCase();
          if (value.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
        }
      }
    };
  }

  // Events table
  onAction(event: any) {}
}
