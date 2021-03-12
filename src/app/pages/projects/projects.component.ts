import { Component, OnInit } from "@angular/core";
import { BaseTable } from "src/app/_helpers/base-table";
import { Utility } from "src/app/_helpers/utility";
import { ModalService } from "src/app/services/helper/modal.service";
import { Select, Store } from "@ngxs/store";
import {
  ProjectState,
  DeleteProject,
  SelectedProject,
  GetProjects,
} from "src/app/store/project.action";
import { Project } from "src/app/_models/project.model";
import { Observable, Subscription } from "rxjs";
import { PROJECT_PHASE } from "src/app/_helpers/convention/phase";
import { DialogConfirmationComponent } from "../_components/shared/dialog/dialog-confirmation/dialog-confirmation.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { ProjectService } from "src/app/services/project.service";
import { AuthService } from "src/app/services/user/auth.service";
import { ALL_ACTIONS } from "src/app/store/_shader/all-actions";

declare var $: any;

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styles: [],
})
export class ProjectsComponent extends BaseTable implements OnInit {
  @Select(ProjectState.projects) projects$: Observable<Project[]>;
  @Select(ProjectState.project) project$: Observable<Project>;

  subscription: Subscription;

  MODAL = "form-project";

  public canCreate = new AuthService().isAllowed(ALL_ACTIONS.PROJECT_CREATE);

  /**
   * Arrow functions
   */

  valuePrepareFunction = (row: any) => {
    return this.helper.readlyStatus([{ status: row }])[0].status;
  };

  filterFunction = (cell?: any, search?: string) => {
    let value: string = cell === "1" ? "Activo" : "Inactivo";
    value = value.toUpperCase();
    if (value.includes(search.toUpperCase()) || search === "") {
      return true;
    } else {
      return false;
    }
  };

  constructor(
    private store: Store,
    public modal: ModalService,
    private modalServicesBs: BsModalService,
    private projectService: ProjectService,
    private helper: Utility
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProjects());

    this.MODE = this.ACTION.CREATE;

    // Add columns
    this.settings.columns = {
      coordinator: {
        title: "Coordinador",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {
          if (cell.name !== undefined) {
            let value: string = cell.name;
            value = value.toUpperCase();

            if (value.includes(search.toUpperCase()) || search === "") {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
      },
      school: {
        title: "Escuela",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {
          if (cell.name !== undefined) {
            let value: string = cell.name;
            value = value.toUpperCase();

            if (value.includes(search.toUpperCase()) || search === "") {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
      },
      sponsor: {
        title: "Padrino",
        type: "string",
        valuePrepareFunction: (row: any) => {
          return row.name;
        },
        filterFunction: (cell?: any, search?: string) => {
          if (cell.name !== undefined) {
            let value: string = cell.name;
            value = value.toUpperCase();

            if (value.includes(search.toUpperCase()) || search === "") {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
      },
      phase: {
        title: "Fase",
        type: "string",
        valuePrepareFunction: (row: any) => {
          const value: string =
            row === PROJECT_PHASE.STEPS.CODE
              ? PROJECT_PHASE.STEPS.VALUE
              : PROJECT_PHASE.PECA.VALUE;
          return value;
        },
        filterFunction: (cell?: any, search?: string) => {
          if (cell !== undefined) {
            let value: string =
              cell === PROJECT_PHASE.STEPS.CODE
                ? PROJECT_PHASE.STEPS.VALUE
                : PROJECT_PHASE.PECA.VALUE;
            value = value.toUpperCase();

            if (value.includes(search.toUpperCase()) || search === "") {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
      },
      status: {
        title: "Estatus",
        type: "string",
        valuePrepareFunction: this.valuePrepareFunction,
        filterFunction: this.filterFunction,
      },
    };

    this.validateAction(
      !new AuthService().isAllowed(ALL_ACTIONS.PROJECT_EDIT),
      !new AuthService().isAllowed(ALL_ACTIONS.PROJECT_DELETE)
    );
  }

  clear() {}

  // Events table
  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.VIEW:
        console.log(event.data);
        this.store.dispatch(new SelectedProject(event.data));
        this.modal.open("view-project");
        break;
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.modal.open(this.MODAL);
        this.store.dispatch(new SelectedProject(event.data));
        break;
      case this.ACTION.DELETE:
        const modal = this.modalServicesBs.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: "modal-dialog-centered" })
        );

        // -- Set up modal
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          "Eliminar proyecto",
          "¿Desea eliminar el proyecto?"
        );

        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            if (result === true) {
              this.subscription = this.projectService
                .deleteProject(event.data.id)
                .subscribe(
                  (response) => {
                    (modal.content as DialogConfirmationComponent).hideConfirmationModal();

                    this.store.dispatch(new DeleteProject(event.data.id));
                  },
                  (err: any) => {
                    (modal.content as DialogConfirmationComponent).errorDelete(
                      err
                    );
                  }
                );
            }
          }
        );

        break;
    }
  }
}
