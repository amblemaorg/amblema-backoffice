import { Component, OnInit } from '@angular/core';
import { AbstractPageTable } from '../_helpers/abstract.page.table';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent extends AbstractPageTable implements OnInit {


  data: any = [
    {
      name: 'Escula maestra altagracia de garcia',
      content:  "Primer component"
    },
    {
      name: "Antonio Jose de Sucre",
      content:  "Segundo content"
    },
    {
      name: "Ruiz Pineda",
      content:  "Segundo content"
    }
  ]

  ngOnInit() {
  
    this.settings.columns = {
      name: {
        title: 'Nombre de la escuela',
        type: 'string'     
      }, 
      content: {
        title: 'Contenido web',
        filter: false,
        sort: false,
        type: 'custom', 
        renderComponent: SchoolSettingsComponent
      }
    }
  }

}
