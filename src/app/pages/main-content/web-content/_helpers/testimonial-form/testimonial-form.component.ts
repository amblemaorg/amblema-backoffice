import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/_helpers/base-table';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Testimonial } from 'src/app/_models/web/testimonial.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
})
export class TestimonialFormComponent extends BaseTable
  implements OnInit, TableActions, OnDestroy {
  @Input() testimonials: Testimonial[];
  @Output() register = new EventEmitter<Testimonial>();
  @Output() edit = new EventEmitter<Testimonial[]>();
  @Output() delete = new EventEmitter<Testimonial>();

  @Input() maxDescription: number;

  subscription: Subscription;

  form: FormGroup;
  submitted = false;
  MODE = this.ACTION.CREATE;
  oldTestimonials: Testimonial; // <-- For update testimonials array

  constructor(
    private toast: CustomToastrService,
    private formBuilder: FormBuilder,

    protected modalService?: BsModalService
  ) {
    super('form-testimonial');

    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      function: new FormControl(),
      description: new FormControl('', [Validators.required]),
    });

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];

    this.settings.pager.perPage = 5;

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
      description: {
        title: 'Descripción',
        type: 'string',
      },
    };
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onAction(event: any): void {
    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.oldTestimonials = event.data;
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
          'Eliminar testimonio',
          '¿Desea eliminar el testimonio seleccionado?',
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

    // Error messages
    if (this.form.controls.image.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error(
          'Campo requerido',
          'Debe cargar un imagen para completar el registro de un testimonio'
        );
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error(
          'Campo requerido',
          'Debe cargar un imagen para actualizar el registro de un testimonio'
        );
      }
    }

    if (this.form.valid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.register.emit(this.form.value);
        this.form.reset();
        this.submitted = false;
      } else if (this.MODE === this.ACTION.EDIT) {
        this.edit.emit([this.oldTestimonials, this.form.value]);
        this.form.reset();
        this.submitted = false;
        this.MODE = this.ACTION.CREATE;
      }
    }
  }
}
