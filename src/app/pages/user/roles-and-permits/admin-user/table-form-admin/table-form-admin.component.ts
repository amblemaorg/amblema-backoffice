import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractSmartTable } from '../../../_shared/smart-table/abstract-smart-table';
import {
  AdminUserState,
  SelectedAdminUser,
  DeleteAdminUser,
} from 'src/app/store/user/admin-user.action';
import { Select, Store } from '@ngxs/store';
import { AdminUser } from 'src/app/_models/user/admin-user.model';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { FORM_MODALITY } from '../../../_shared/abstract-form-mode';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormModeService } from '../../../_services/form-mode.service';
import { ModalFormAdminComponent } from '../modal-form-admin/modal-form-admin.component';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-table-form-admin',
  templateUrl: './table-form-admin.component.html',
  styleUrls: ['./table-form-admin.component.scss'],
})
export class TableFormAdminComponent extends AbstractSmartTable
  implements OnInit, OnDestroy {
  @Select(AdminUserState.adminUsers) dataUsers$: Observable<AdminUser[]>;
  subscription: Subscription;

  constructor(
    private formModeService: FormModeService,
    private modalService: BsModalService,
    private store: Store
  ) {
    super();
  }

  ngOnInit() {
    // -- Config columns
    this.settings.columns = {
      firstName: {
        title: 'Nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      function: {
        title: 'Cargo',
        type: 'string',
      },
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCustomAction(event: any) {
    // -- Selected user --
    this.store.dispatch(new SelectedAdminUser(event.data));

    switch (event.action) {
      case FORM_MODALITY.VIEW.value:
        break;
      case FORM_MODALITY.EDIT.value:
        // -- Set mode form
        this.formModeService.setMode(FORM_MODALITY.EDIT.value);
        // -- Open modal form
        this.modalService.show(
          ModalFormAdminComponent,
          Object.assign({}, { class: 'modal-xl modal-dialog-centered' })
        );
        break;
      case FORM_MODALITY.DELETE.value:
        // -- Instance dialog
        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Setup dialog
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar usuario administrador',
          '¿Desea eliminar este usuario de forma permanente?'
        );

        // -- Listen the action
        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {

            // -- Yes then delete it
            if (result === true) {
              this.store.dispatch(new DeleteAdminUser(event.data));
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            }
          },

          (err: any) =>
            (modal.content as DialogConfirmationComponent).errorDelete(err) // <-- Error messages
        );

        break;
    }
  }
}
