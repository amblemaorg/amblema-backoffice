import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { Store } from '@ngxs/store';
import { DeleteLapseActivity } from 'src/app/store/lapse-activities.action';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { MenuSetUp } from 'src/app/pages/pages-menu-service';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.scss'],
})
export class ButtonDeleteComponent implements OnInit {
  @Input() value: any;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  constructor(
    private modalServicesBs: BsModalService,
    private menuService: MenuSetUp,
    private toastr: CustomToastrService,
    private store: Store,
    private lapseActivityService: LapseActivitiesService
  ) {}

  ngOnInit() {}

  onclick() {
    const modal = this.modalServicesBs.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar actividad de lapso',
      '¿Desea eliminar la actividad de lapso seleccionada?',
      'Verifica el lapso'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.lapseActivityService
            .deleteActivity(this.rowData.id, this.rowData.lapse)
            .subscribe((response) => {
              this.toastr.deleteRegister(
                'Eliminación',
                'Se ha eliminado una actividad'
              );
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();

              this.store.dispatch(
                new DeleteLapseActivity(this.rowData.id, this.rowData.lapse)
              );
              this.menuService.renderMenu(true);
            });
        }
      }
    );
  }
}
