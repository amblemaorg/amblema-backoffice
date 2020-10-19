import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Award } from 'src/app/_models/web/web-about.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/_helpers/base-table';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-award-form',
  templateUrl: './award-form.component.html',
  styleUrls: ['./award-form.component.scss'],
})
export class AwardFormComponent extends BaseTable implements TableActions {
  @Input() awards: Award[];
  @Output() register = new EventEmitter<Award>();
  @Output() edit = new EventEmitter<Award[]>();
  @Output() delete = new EventEmitter<Award>();

  subscription: Subscription;

  form: FormGroup;
  submitted = false;
  MODE = this.ACTION.CREATE;
  oldAward: Award;

  constructor(
    private toast: CustomToastrService,
    private formBuilder: FormBuilder,

    protected modalService?: BsModalService
  ) {
    super('form-awards');

    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      image2: new FormControl('', [Validators.required]),
      image3: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      description2: new FormControl('', [Validators.required]),
    });

    this.settings.pager.perPage = 5;

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];

    this.settings.columns = {
      title: {
        title: 'Título',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      description2: {
        title: 'Segunda descripción',
        type: 'string',
      },
    };
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.oldAward = event.data;
        this.form.patchValue(event.data);
        break;
      case this.ACTION.DELETE:
        // -- Instance dialog
        const modal = this.modalService.show(
          DialogConfirmationComponent,
          Object.assign({}, { class: 'modal-dialog-centered' })
        );

        // -- Setup dialog
        (modal.content as DialogConfirmationComponent).showConfirmationModal(
          'Eliminar premio o reconocimiento',
          '¿Desea eliminar premio o reconocimiento seleccionado?',
          'No se eliminará hasta que guarde los cambios.'
        );

        // -- Listen the action
        this.subscription = (modal.content as DialogConfirmationComponent).onClose.subscribe(
          (result) => {
            // -- Yes then delete it
            if (result === true) {
              this.delete.emit(event.data);
              (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            }
          },
          (err: any) =>
            (modal.content as DialogConfirmationComponent).errorDelete(err) // <-- Error messages
        );

        break;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.controls.image.invalid || this.form.controls.image2.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error(
          'Campo requerido',
          'Debe cargar un imagen para completar el registro de premios y reconocimientos'
        );
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error(
          'Campo requerido',
          'Debe cargar un imagen para actualizar el registro de premios y reconocimientos'
        );
      }
    }

    if (this.form.valid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.register.emit(this.form.value);
        this.form.reset();
        this.submitted = false;
      } else if (this.MODE === this.ACTION.EDIT) {
        this.edit.emit([this.oldAward, this.form.value]);
        this.form.reset();
        this.submitted = false;
        this.MODE = this.ACTION.CREATE;
      }
    }
  }
}
