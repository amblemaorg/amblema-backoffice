import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { Slider, Learning } from 'src/app/models/learning.model';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetMedia } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent extends BaseTable implements OnDestroy, OnInit, TableActions {

  @Select( LearningState.learning ) data$: Observable<Learning>;
  subscription: Subscription; 

  /**
   * Type file manager
   */
  options = [
    { value: '1', label: 'Imagen' },
    { value: '2', label: 'Video' },
  ];
  option;

  sliders: Slider[]; // <-- To get all sliders
  slider: Slider; 

  formMedia: FormGroup = new FormGroup({
    url: new FormControl({ value: '', disabled: false }, [Validators.required]),
    description: new FormControl({ value: '', disabled: false }, [Validators.required]), 
    type: new FormControl({ value: this.options[0].value, disabled: false })
  })

  constructor(
    private store: Store
  ) {
    super('form-media-mixto');

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // -- Custom table --
    this.settings.columns = {
      url: {
        title: 'Archivo',
        type: 'string'
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
      type: {
        title: 'Tipo',
        type: 'string'
      }
    };
  }

  ngOnInit(): void {
    this.option = this.options[0].value; // <-- Set default value

    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.slider; 
    });
  }

  ngOnDestroy(): void {
    if( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onSaveStepTwo(): void {

  }

  onAction(event: any) {

  }

  addMedia() {
    this.store.dispatch( new SetMedia( this.formMedia.value ) );
  }
}
