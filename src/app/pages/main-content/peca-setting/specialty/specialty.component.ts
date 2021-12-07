import { Component, OnInit, OnDestroy } from "@angular/core";
import { SpecialtyService } from "src/app/services/specialty.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/user/auth.service";
import { ALL_ACTIONS } from "src/app/store/_shader/all-actions";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-specialty",
  templateUrl: "./specialty.component.html",
  styleUrls: ["./specialty.component.scss"],
})
export class SpecialtyComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  data = new Array<any>();
  source: LocalDataSource = new LocalDataSource();
  settings: any;

  constructor(
    private toastr: CustomToastrService,
    private specialtyService: SpecialtyService
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
          title: "Especialidad",
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
  onSaveConfirm(event) {
    if (event.data.name != event.newData.name) {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.specialtyService
        .updateSpecialty(event.newData.id, payload)
        .subscribe((response) => {
          this.toastr.updateSuccess(
            "Actualización",
            "Especialidad actualizada"
          );
          this.getSpecialities();
        });

      event.confirm.resolve();
    }
  }

  onAddConfirm(event) {
    console.log(event);
    if (event.newData.name != "") {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.specialtyService
        .saveSpecialty(payload)
        .subscribe((response) => {
          this.toastr.updateSuccess("Éxito", "Especialidad agregada");
          this.getSpecialities();
        });

      event.confirm.resolve();
    }
    /*if (event.data.name != event.newData.name) {
      var payload = {
        name: event.newData.name,
      };
      this.subscription = this.specialtyService
        .updateSpecialty(event.newData.id, payload)
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
    console.log("ssss");
    if (window.confirm("¿Esta seguro de eliminar la especialidad?")) {
      this.subscription = this.specialtyService
        .deleteSpecialty(event.data.id)
        .subscribe((response) => {
          this.toastr.updateSuccess("Actualización", "Especialidad eliminada");
          this.getSpecialities();
        });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  getSpecialities() {
    this.subscription = this.specialtyService
      .getSpecialty()
      .subscribe((response) => {
        this.data = response?.records;
        this.source.load(this.data);
        console.log(response);
      });
  }
}
