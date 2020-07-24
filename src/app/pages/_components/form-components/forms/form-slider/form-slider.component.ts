import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { BaseTable } from 'src/app/_helpers/base-table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Slider } from 'src/app/_models/web/slider.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseTable implements OnInit {

  @Input() public sliders: Slider[];

  @Output() protected register = new EventEmitter<Slider>();
  @Output() protected edit = new EventEmitter<Slider[]>();
  @Output() protected delete = new EventEmitter<Slider>();


  public form: FormGroup;
  public MODE = this.ACTION.CREATE;
  public oldSlider: Slider; // <-- For update slider

  constructor(
    public taostr: CustomToastrService,
    public sanitizer: DomSanitizer,
    public formBuilder: FormBuilder) {
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

  onAction(event: any): void {

    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.oldSlider = event.data;
        this.form.patchValue(event.data);
        break;
      case this.ACTION.DELETE:
        this.delete.emit(event.data);
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
