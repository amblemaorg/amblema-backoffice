import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { Utility } from 'src/app/helpers/utility';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Select, Store } from '@ngxs/store';
import { ProjectState, DeleteProject, SelectedProject } from 'src/app/store/project.action';
import { Project } from 'src/app/models/project.model';
import { Observable } from 'rxjs';
import { PROJECT_PHASE } from 'src/app/helpers/convention/phase';

declare var $: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent extends BaseTable implements OnInit {

  @Select(ProjectState.projects) projects$: Observable<Project[]>;
  @Select(ProjectState.project) project$: Observable<Project>;

  MODAL = 'form-project';

  /**
   * Arrow functions
   */

  valuePrepareFunction = (row: any) => {
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
    private store: Store,
    public modal: ModalService,
    private helper: Utility) { super(); }

  ngOnInit(): void {
    this.MODE = this.ACTION.CREATE;

    // Add columns
    this.settings.columns = {
      coordinator: {
        title: 'Coordinador',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {

          if (cell.name.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
        }
      },
      school: {
        title: 'Escuela',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {

          if (cell.name.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
        }
      },
      sponsor: {
        title: 'Padrino',
        type: 'text',
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {

          if (cell.name.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
        }
      },
      phase: {
        title: 'Fase',
        type: 'string',
        valuePrepareFunction: (row: any) => {
          const value: string = row === PROJECT_PHASE.STEPS.CODE ? PROJECT_PHASE.STEPS.VALUE : PROJECT_PHASE.PECA.VALUE;
          return value;
        },
        filterFunction: (cell?: any, search?: string) => {

          if (cell.name.indexOf(search.toUpperCase()) === 0 || search === '') {
            return true;
          } else { return false; }
        }
      },
      status: {
        title: 'Estatus',
        type: 'string',
        valuePrepareFunction: this.valuePrepareFunction,
        filterFunction: this.filterFunction,
      }
    };
  }

  clear() {

  }

  // Events table
  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        this.store.dispatch(new SelectedProject(event.data));
        this.modal.open('view-project');
        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.modal.open(this.MODAL);
        this.store.dispatch(new SelectedProject(event.data));
        break;
      case this.ACTION.DELETE:
        this.store.dispatch(new DeleteProject(event.data.id));
        break;
    }
  }
}
