import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

/**
 * Ventanas como en el resto del backoffice (usuarios, roles): formularios en `app-modal`
 * (Bootstrap + jQuery) y confirmaciones con `DialogConfirmationComponent`.
 */

declare var $: any;

export function showModal(id: string): void {
  $(`#${id}`).modal('show');
}

export function hideModal(id: string): void {
  $(`#${id}`).modal('hide');
}

export interface Confirmation {
  /** Emite una sola vez, al pulsar "Confirmar" (un doble clic no repite la acción). */
  confirmed$: Observable<boolean>;
  /** Cierra el diálogo (tras la respuesta del servidor). */
  close(): void;
}

/**
 * Diálogo de confirmación estándar. `neutral`: pregunta en negro y centrada, para acciones
 * que no destruyen nada (aprobar, guardar con avisos).
 */
export function confirmAction(
  modals: BsModalService,
  title: string,
  body: string,
  info?: string,
  neutral = false,
): Confirmation {
  const ref = modals.show(DialogConfirmationComponent, { class: 'modal-dialog-centered' });
  const dialog = ref.content as DialogConfirmationComponent;
  dialog.showConfirmationModal(title, body, info, neutral);
  return {
    confirmed$: dialog.onClose.pipe(filter((result) => result === true), take(1)),
    close: () => dialog.hideConfirmationModal(),
  };
}
