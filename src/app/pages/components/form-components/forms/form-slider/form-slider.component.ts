import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Slider } from 'src/app/models/web/slider.model';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseTable implements TableActions, OnInit {

  @Input() sliders: Slider[];

  @Output() register = new EventEmitter<Slider>();
  @Output() edit = new EventEmitter<Slider[]>();
  @Output() delete = new EventEmitter<Slider>();

  form: FormGroup;
  MODE = this.ACTION.CREATE;
  oldSlider: Slider; // <-- For update slider

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) {
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
      description: new FormControl('', [Validators.required])
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
      this.register.emit(this.form.value);
      this.form.reset();
      this.form.controls.image.setValue(null);
    } else {
      this.edit.emit([this.oldSlider, this.form.value]);
      this.form.reset();
      this.MODE = this.ACTION.CREATE;

    }
  }

}