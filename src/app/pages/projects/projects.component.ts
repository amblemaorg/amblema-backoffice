import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent extends BaseTable implements OnInit {

  data: any; // <-- Dummy variable

  constructor() { super(); }

  ngOnInit(): void {
    // Add columns
    this.settings.columns = {
      coordinator : {
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
        type: 'string'
      }
    };
  }

  // Events table
  onAction( event: any )  {

  }
}
