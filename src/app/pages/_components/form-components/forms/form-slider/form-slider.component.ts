import { Component, Input, OnInit, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Slider } from 'src/app/_models/web/slider.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { DialogConfirmationComponent } from '../../../shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseTable implements OnInit, OnDestroy {

  @Input() public sliders: Slider[];

  @Output() protected register = new EventEmitter<Slider>();
  @Output() protected edit = new EventEmitter<Slider[]>();
  @Output() protected delete = new EventEmitter<Slider>();

  subscription: Subscription;

  public form: FormGroup;
  public MODE = this.ACTION.CREATE;
  public oldSlider: Slider; // <-- For update slider

  constructor(
    public taostr: CustomToastrService,
    public sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,

    public modalService?: BsModalService, ) {
    super('form-slider');

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // Max display
    this.settings.pager.perPage = 3;

    // Custome
    this.settings.columns = {
      image: {
        title: 'Imagen',
        type: 'html',
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(`<img src="${value}" style="width:100px;">`);
        },
        filter: false,
        sort: false
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
    };
  }

  ngOnInit(): void {


    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(56)])
    });
  }

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
        this.oldSlider = event.data;
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
          'Eliminar diapositiva',
          '¿Desea eliminar la dispositiva seleccionada?',
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


    if (this.MODE === this.ACTION.CREATE) {

      if ( this.sliders.length < 6 ) {
        this.register.emit(this.form.value);
        this.form.reset();
        this.form.controls.image.setValue(null);
      } else {
        this.taostr.error('Limite', 'Solo se puede realizar 6 registro');
      }
    } else {
      this.edit.emit([this.oldSlider, this.form.value]);
      this.form.reset();
      this.MODE = this.ACTION.CREATE;

    }
  }

}
