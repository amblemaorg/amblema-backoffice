import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { Slider } from 'src/app/models/web/web-home.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetSlider } from 'src/app/store/web-home.action';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseTable implements TableActions, OnInit {

  @Input() slide: Observable<Slider[]>; 
  @Output() register = new EventEmitter<Slider>();

  form: FormGroup; 

  MODE = this.ACTION.CREATE; 

  constructor( 
    private store: Store,
    private formBuilder: FormBuilder ) {
    super('');
    // Chage button actions
    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // Max display
    this.settings.pager.perPage = 5;

    // Custome
    this.settings.columns = {
      image: {
        title: 'Imagen',
        type: 'string'
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
    switch( event.action ) {

      case this.ACTION.EDIT: 
        break;
      case this.ACTION.DELETE: 
        break;
    }
  }

  onSubmit() { 

    if ( this.MODE === this.ACTION.CREATE ) {

    this.register.emit( this.form.value );
    }

  }
}
