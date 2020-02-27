import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseTable, TableActions } from 'src/app/helpers/base-table';
import { SliderMedia } from 'src/app/models/learning.model';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetMedia, DeleteMedia, UpdateMedia } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent extends BaseTable implements OnDestroy, OnInit, TableActions {

  @Select(LearningState.medias) data$: Observable<SliderMedia[]>;
  subscription: Subscription;

  /**
   * Type file manager
   */
  options = [
    { value: 'Imagen', label: 'Imagen' },
    { value: 'Video', label: 'Video' },
  ];
  option;

  sliders: SliderMedia[]; // <-- To get all sliders
  slider: SliderMedia;

  sliderBackUp: SliderMedia; // <-- To backup value

  formMedia: FormGroup = new FormGroup({
    url: new FormControl({ value: '', disabled: false }, [Validators.required]),
    description: new FormControl({ value: '', disabled: false }, [Validators.required]),
    type: new FormControl({ value: this.options[0].value, disabled: false })
  });

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer
  ) {
    super('form-media-mixto');

    this.MODE = this.ACTION.CREATE;

    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // -- Custom table --
    this.settings.columns = {
      url: {
        title: 'Archivo',
        type: 'html',
        width: '250px',
        filter: false,
        sort: false,
        valuePrepareFunction: (value, row: SliderMedia) => {
          if (row.type === this.options[0].value) {
            return this.sanitizer.bypassSecurityTrustHtml(`<img src="${value}" style="width:100px;">`);
          } else if (row.type === this.options[1].value) {
            return this.sanitizer.bypassSecurityTrustHtml(`<a href="${value}" target="_blank">${value}</a>`);
          }
        },
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value === this.options[0].value) {
            return 'Imagen';
          } else if (value === this.options[1].value) {
            return 'Video';
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.option = this.options[0].value; // <-- Set default value

    this.subscription = this.data$.subscribe(response => {
      this.sliders = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSaveStepTwo(): void { }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.sliderBackUp = event.data;
        this.formMedia.patchValue(event.data);
        break;
      case this.ACTION.DELETE:
        this.store.dispatch(new DeleteMedia(event.data));
        break;
    }
  }

  onMedia() {
    if (this.MODE === this.ACTION.CREATE) {
      this.store.dispatch(new SetMedia(this.formMedia.value));
      this.formMedia.controls.url.reset();
      this.formMedia.controls.description.reset();
    } else if (this.MODE === this.ACTION.EDIT) {
      this.store.dispatch( new UpdateMedia( this.sliderBackUp, this.formMedia.value ) );
      this.MODE = this.ACTION.CREATE;
      this.formMedia.controls.url.reset();
      this.formMedia.controls.description.reset();
    }
  }

  /**
   * This is for to adapt the values
   * in the files.
   */

  changeTypeFile() {
    if (this.MODE === this.ACTION.EDIT) {
      if (this.formMedia.controls.type.value !== this.sliderBackUp.type) {
        this.formMedia.controls.url.setValue(this.sliderBackUp.url);
      } else {
        this.formMedia.controls.url.reset();
      }
    }
  }
}
