import { Component } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { EnrolledSchool } from 'src/app/_models/_enrolled/enrolled-school.model';
import { Observable, Subscription } from 'rxjs';
import {
  GeneralEnrolledState,
  RemoveEnrolledShool,
} from 'src/app/store/_enrolled/enrolled.action';
import { Select, Store } from '@ngxs/store';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-school-board',
  templateUrl: './school-board.component.html',
  styles: [],
})
export class SchoolBoardComponent extends BaseTable {
  @Select(GeneralEnrolledState.enrolledSchools) data$: Observable<
    EnrolledSchool[]
  >;

  subscription: Subscription;

  constructor(
    private store: Store,
    private toastr: CustomToastrService,
    private enrolledServices: EnrolledService,
    private modalX: BsModalService
  ) {
    super('form-admin-school');

    this.settings.actions.custom = [
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];

    this.settings.columns = {
      name: {
        title: 'Nombre de la escuela',
        type: 'string',
      },
      code: {
        title: 'Código del plantel',
        type: 'string',
      },
    };
  }

  onAction(event: any) {
    const modal = this.modalX.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Circunscribir escuela',
      '¿Desea Circunscribir la escuela seleccionada?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.enrolledServices
            .removeEnrolledSchool(event.data.projectId)
            .subscribe((response) => {
              this.toastr.info(
                'Actualización',
                'La escuela seleccionada deja de estar inscrita'
              );
              this.store.dispatch(
                new RemoveEnrolledShool(event.data.projectId)
              );

              (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            });
        }
      }
    );
  }
}
