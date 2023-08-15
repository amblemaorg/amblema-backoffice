import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { WorkPositionService } from "src/app/services/work-position.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/user/auth.service";
import { ALL_ACTIONS } from "src/app/store/_shader/all-actions";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-work-position",
  templateUrl: "./work-position.component.html",
  styleUrls: ["./work-position.component.scss"],
})
export class WorkPositionComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;

  data = new Array<any>();
  source: LocalDataSource = new LocalDataSource();
  settings: any;

  constructor(
    private toastr: CustomToastrService,
    private workpositionService: WorkPositionService
  ) {
    this.settings = {
      actions: {
        columnTitle: "Acciones",
        add: true,
        delete: true,
        edit: true,
        width: "10%",
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        //saveButtonCoonDeleteConfirmntent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmDelete: true,
      },
      columns: {
        name: {
          title: "Cargo",
          type: "string",
          editable: true,
        },
      },
    };
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getSpecialities();
  }

  ngAfterViewInit(): void {
    let input: any = document.querySelector(
      ".nb-theme-default ng2-smart-table thead tr.ng2-smart-filters th .ng2-smart-filter input"
    );

    if (input) {
      input.placeholder = "Buscar cargo";
    }
  }

  onSaveConfirm(event) {
    if (event.data.name != event.newData.name) {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.workpositionService
        .updateWorkPosition(event.newData.id, payload)
        .subscribe((response) => {
          this.toastr.updateSuccess(
            "Actualización",
            "Grado de instrucción actualizado"
          );
          this.getSpecialities();
        });

      event.confirm.resolve();
    }
  }

  onAddConfirm(event) {
    // console.log(event);
    if (event.newData.name != "") {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.workpositionService
        .saveWorkPosition(payload)
        .subscribe((response) => {
          this.toastr.updateSuccess("Éxito", "Grado de instrucción agregado");
          this.getSpecialities();
        });

      event.confirm.resolve();
    }
    /*if (event.data.name != event.newData.name) {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.work-positionService
        .updateWorkPosition(event.newData.id, payload)
        .subscribe((response) => {
          this.toastr.updateSuccess(
            "Actualización",
            "Especialidad actualizada"
          );
        });
      event.confirm.resolve();
    }*/
  }
  onDeleteConfirm(event) {
    if (window.confirm("¿Esta seguro de eliminar el grado de instrucción?")) {
      this.subscription = this.workpositionService
        .deleteWorkPosition(event.data.id)
        .subscribe((response) => {
          this.toastr.updateSuccess("Actualización", "Grado de instrucción eliminado");
          this.getSpecialities();
        });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  getSpecialities() {
    this.subscription = this.workpositionService
      .getWorkPosition()
      .subscribe((response) => {
        this.data = response?.records;
        this.source.load(this.data);
        // console.log(response);
      });
  }
}
