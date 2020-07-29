import { Component, OnInit, OnChanges } from '@angular/core';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { FormSliderComponent } from 'src/app/pages/_components/form-components/forms/form-slider/form-slider.component';
import { DomSanitizer, EventManager } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { DialogConfirmationComponent } from 'src/app/pages/_components/shared/dialog/dialog-confirmation/dialog-confirmation.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-slider-standard',
  templateUrl: './slider-standard.component.html',
  styleUrls: ['./slider-standard.component.scss'],
})
export class SliderStandardComponent extends FormSliderComponent
  implements OnChanges {
  constructor(
    public toastr: CustomToastrService,
    public sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,

    public modalServiceX: BsModalService,
  ) {
    super(toastr, sanitizer, formBuilder, modalServiceX);

    this.settings.columns = {
      image: {
        title: 'Imagen',
        type: 'html',
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(
            `<img src="${value}" style="width:100px;">`
          );
        },
        filter: false,
        sort: false,
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
    };
  }

  ngOnChanges() {
    this.source.load(this.sliders);
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
        const modal = this.modalServiceX.show(
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
              this.sliders.forEach((item, index) => {
                if (
                  item.description === event.data.description &&
                  item.image === event.data.image
                ) {
                  this.sliders.splice(index, 1);
                }
              });

              this.source.load(this.sliders);

              (modal.content as DialogConfirmationComponent).hideConfirmationModal();
            }
          }
        );

        break;
    }
  }

  onSubmit() {
    if (this.MODE === this.ACTION.CREATE) {
      if (this.sliders.length < 6) {
        this.source.reset();
        this.sliders.push(this.form.value);
        this.source.load(this.sliders);
        this.form.reset();
        this.form.controls.image.setValue(null);
      } else {
        this.taostr.error('Limite', 'Solo se puede realizar 6 registro');
      }
    } else {
      this.sliders = this.sliders.filter((value) => {
        if (
          value.description === this.oldSlider.description &&
          value.image === this.oldSlider.image
        ) {
          value.description = this.form.controls.description.value;
          value.image = this.form.controls.image.value;
        }

        return true;
      });
      this.form.reset();
      this.MODE = this.ACTION.CREATE;
      this.source.load(this.sliders);
    }
  }
}
