import { Component, OnInit } from '@angular/core';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { FormSliderComponent } from 'src/app/pages/components/form-components/forms/form-slider/form-slider.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-slider-standard',
  templateUrl: './slider-standard.component.html',
  styleUrls: ['./slider-standard.component.scss']
})
export class SliderStandardComponent extends FormSliderComponent {

  constructor(
    public toastr: CustomToastrService,
    public sanitizer: DomSanitizer,
    public formBuilder: FormBuilder
  ) {
    super(toastr, sanitizer, formBuilder);

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

  onAction( event: any ): void {

    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.oldSlider = event.data;
        this.form.patchValue(event.data);
        break;
      case this.ACTION.DELETE:
        this.sliders = this.sliders.filter( value => {

          if ( value.description === event.data.description && value.image === event.data.image  ) {
            return false;
          }

          return true;
        } );
        this.source.load(this.sliders);
        break;
    }
  }

  onSubmit() {

    if ( this.MODE === this.ACTION.CREATE ) {
      if ( this.sliders.length < 6 ) {
        this.source.reset();
        this.sliders.push(this.form.value);
        this.source.load( this.sliders );
        this.form.reset();
        this.form.controls.image.setValue(null);
      } else {
        this.taostr.error('Limite', 'Solo se puede realizar 6 registro');
      }
    } else {

      this.sliders = this.sliders.filter( value => {

        if ( value.description === this.oldSlider.description && value.image === this.oldSlider.image  ) {

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
