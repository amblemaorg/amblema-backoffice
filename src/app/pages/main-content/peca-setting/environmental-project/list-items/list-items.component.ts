import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ACTION } from 'src/app/_helpers/text-content/text-crud';
import { AbstractControl, FormControl } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  @Input() title: string;
  @Input() list = new Array<any>();

  // -- This attribute is for activities, since
  // -- they are treated as an object and not as
  // -- a simple arrangement like the others
  @Input() asAnObject: boolean | null = false;

  @Output() delete = new EventEmitter<any>();

  subscription: Subscription;

  MODE_LIST;
  ACTION = ACTION;
  ID_ITEM: number;

  control: AbstractControl | null = new FormControl();

  constructor(
    private toastr: CustomToastrService,
    public modalService: BsModalService
  ) {}

  ngOnInit() {
    // Init mode create
    this.MODE_LIST = this.ACTION.CREATE;
  }

  addItem() {
    if (this.asAnObject) {
      this.list.push({ name: this.control.value });
      this.control.reset();
    } else {
      this.list.push(this.control.value);
      this.control.reset();
    }
  }

  public onEditItem(index: number): void {
    this.MODE_LIST = ACTION.EDIT;
    this.ID_ITEM = index;

    if ( this.asAnObject ) {
      this.control.setValue(this.list[index].name);
    } else {
      this.control.setValue(this.list[index]);
    }

  }

  public onDeleteItem(index: number): void {
    const modal = this.modalService.show(
      DialogConfirmationComponent,
      Object.assign({}, { class: 'modal-dialog-centered' })
    );

    // -- Set up modal
    (modal.content as DialogConfirmationComponent).showConfirmationModal(
      'Eliminar objectivo',
      '¿Desea eliminar el objectivo seleccionado?'
    );

    this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
      (result) => {
        if (result === true) {
          this.list = this.list.filter((value, key) => key !== index);

          /**
           * In case the object is read only. Elimination is ermetic
           */
          this.delete.emit(this.list); // <-- Emit the delete to state

          this.toastr.deleteRegister(
            'Eliminado',
            'Se ha eliminado una opción de la lista'
          );

          (modal.content as DialogConfirmationComponent).hideConfirmationModal();
        }
      }
    );
  }

  confirmAction() {
    if (this.MODE_LIST === ACTION.EDIT) {

      if ( this.asAnObject ) {

        this.list[this.ID_ITEM] = Object.assign( {}, this.list[this.ID_ITEM] );
        this.list[this.ID_ITEM].name = this.control.value;

      } else {
        this.list[this.ID_ITEM] = this.control.value;
      }

    }
    this.MODE_LIST = ACTION.CREATE;
    this.control.reset();
  }

  onEnter() {
    if (this.control.value) {
      this.addItem();
    }
  }
}
