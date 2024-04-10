import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { LapseActivitiesService } from "src/app/services/lapse-activities.service";
import { ViewCell } from "ng2-smart-table";
import { CustomToastrService } from "src/app/services/helper/custom-toastr.service";
import { Store } from "@ngxs/store";
import {
  UpdateStatusLapseActivity,
  GetLapActivities,
} from "src/app/store/lapse-activities.action";
import { STATUS } from "src/app/_helpers/convention/status";
import { MenuSetUp } from "src/app/pages/pages-menu-service";
import { BsModalService } from "ngx-bootstrap/modal";
import { DialogConfirmationComponent } from "src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component";

@Component({
  selector: "app-special-toggle",
  templateUrl: "./special-toggle.component.html",
  styleUrls: ["./special-toggle.component.scss"],
})
export class SpecialToggleComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  control: AbstractControl | null = new FormControl();

  constructor(
    private menuSetUp: MenuSetUp,
    private store: Store,
    private toatr: CustomToastrService,
    private lapseActivityService: LapseActivitiesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.control.setValue(this.rowData.status === "1" ? true : false);
  }

  onclick() {
    // Prepare the data to update
    const value: any = {
      id: this.rowData.isStandard ? this.rowData.devName : this.rowData.id,
      lapse: this.rowData.lapse,
      isStandard: this.rowData.isStandard,
      status: this.control.value ? STATUS.ACTIVE.VALUE : STATUS.INACTIVE.VALUE,
      order: this.rowData.order
    };

    // -- Validation three standar activity = annualConvention, annualPreparation, mathOlympic
    if (
      this.rowData.devName === "annualConvention" ||
      this.rowData.devName === "annualPreparation"
    ) {
      // -- Validate status
      const modal = this.modalService.show(
        DialogConfirmationComponent,
        Object.assign({}, { class: "modal-dialog-centered" })
      );

      // -- Set up modal
      (modal.content as DialogConfirmationComponent).showConfirmationModal(
        "Cambio de estatus",
        "¿Desea cambiar de estatus la actividad?",
        "Los datos de la actividad se perderán en el lapso en donde esté activo."
      );

      (modal.content as DialogConfirmationComponent).onClose.subscribe(
        (result) => {
          if (result === true) {
            this.updateStatus(value);
            (
              modal.content as DialogConfirmationComponent
            ).hideConfirmationModal();
            return true;
          } else if (result === false) {
            this.control.setValue(this.rowData.status === "1" ? true : false);
          }
        }
      );
    } else {
      this.updateStatus(value);
    }
  }

  private updateStatus(value: any) {
    // Update the status
    this.lapseActivityService.statusActivity(value).subscribe((response) => {
      this.toatr.updateSuccess(
        "Actualización",
        "Se ha cambiado el estatus de una actividad"
      );

      const newData: any = this.rowData;
      newData.status = this.control.value
        ? STATUS.ACTIVE.VALUE
        : STATUS.INACTIVE.VALUE;
      newData.order = this.rowData.order;
      this.store.dispatch(
        new UpdateStatusLapseActivity(newData, newData.lapse)
      );

      this.menuSetUp.renderMenu(true);

      setTimeout(() => {
        this.store.dispatch(new GetLapActivities());
      }, 1000);
    });
  }
}
