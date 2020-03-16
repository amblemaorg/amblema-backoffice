import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Award } from 'src/app/models/web/web-about.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-award-form',
  templateUrl: './award-form.component.html',
  styleUrls: ['./award-form.component.scss']
})
export class AwardFormComponent extends BaseTable implements TableActions {

  @Input() awards: Award[];
  @Output() register = new EventEmitter<Award>();
  @Output() edit = new EventEmitter<Award[]>();
  @Output() delete = new EventEmitter<Award>();

  form: FormGroup;
  submitted = false;
  MODE = this.ACTION.CREATE;
  oldAward: Award;

  constructor(
    private toast: CustomToastrService,
    private formBuilder: FormBuilder
  ) {
    super('form-awards');

    this.form = this.formBuilder.group({
      image: new FormControl( '', [Validators.required] ),
      image2: new FormControl( '', [Validators.required] ),
      image3: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      description2: new FormControl('', [Validators.required])
    });

    this.settings.pager.perPage = 5;

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    this.settings.columns = {
      title: {
        title: 'Titulo',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
      description2: {
        title: 'Segunda descripción',
        type: 'string'
      },
    };
  }

  onAction( event: any ): void {
    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.oldAward = event.data;
        this.form.patchValue(event.data);
        break;
      case this.ACTION.DELETE:
        this.delete.emit(event.data);
        break;
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.controls.image.invalid || this.form.controls.image2.invalid) {
      if (this.MODE === this.ACTION.CREATE) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para completar el registro de premios y reconocimientos');
      } else if (this.MODE === this.ACTION.EDIT) {
        this.toast.error('Campo requerido', 'Debe cargar un imagen para actualizar el registro de premios y reconocimientos');
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
