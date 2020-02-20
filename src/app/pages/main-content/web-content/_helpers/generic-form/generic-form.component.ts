import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Testimonial } from 'src/app/models/web/web-home.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
})
export class GenericFormComponent extends BaseTable implements OnInit, TableActions {

  @Input() testimonials: Testimonial[]; 
  @Output() register = new EventEmitter<Testimonial>();
  @Output() edit = new EventEmitter<Testimonial[]>();
  @Output() delete = new EventEmitter<Testimonial>(); 

  form: FormGroup; 
  submitted = false;
  MODE = this.ACTION.CREATE;
  oldTestimonials : Testimonial; // <-- For update testimonials array
  
  constructor( private formBuilder:FormBuilder ) {
    super('form-testimonial');

    this.form = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      name: new FormControl(), 
      lastName: new FormControl(), 
      position: new FormControl(), 
      description: new FormControl('', [Validators.required])
    });

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    this.settings.pager.perPage = 5;

    this.settings.columns = {
      name: {
        title: 'Nombre',
        type: 'string'
      },
      lastName: {
        title: 'Apellido',
        type: 'string'
      },
      position: {
        title: 'Cargo',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
    };
  }

  ngOnInit() {
  }

  onAction( event:any ) : void {
    switch( event.action ) {
      case this.ACTION.EDIT: 
        break;
      case this.ACTION.DELETE: 
        break;
    }
  }

  onSubmit() {

    this.submitted = true;

  }

}
