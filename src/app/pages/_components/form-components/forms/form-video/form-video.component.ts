import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseTable, TableActions } from 'src/app/_helpers/base-table';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Video } from 'src/app/_models/media.model';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styles: []
})
export class FormVideoComponent extends BaseTable implements TableActions {

  @Input() form: FormGroup;
  @Input() videos: Video[];

  @Output() sendvideos = new EventEmitter<Video[]>();

  idVideo: any;
  MODE = this.ACTION.CREATE;

  constructor(private bf: FormBuilder) {
    super('form-video');

    this.form = this.bf.group({
      url: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    // Chage button actions
    this.settings.actions.custom = [
      { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' }
    ];

    // // Max display
    this.settings.pager.perPage = 5;

    this.settings.columns = {
      url: {
        title: 'Video',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string'
      }
    };

  }

  onEditVideo(): void {
    this.videos = Object.assign([], this.videos);

    // for (const index of this.videos) {

    // }

    // for (let index = 0; index < this.videos.length; index++) {
    //   if (this.videos[index].id === this.idVideo) {
    //     this.videos[index].url = this.form.controls.url.value;
    //     this.videos[index].description = this.form.controls.description.value;
    //   }
    // }
    this.form.reset();

    this.sendvideos.emit( this.videos );
    this.MODE = this.ACTION.CREATE;
  }

  onAction(event: any) {
    switch (event.action) {
      case this.ACTION.EDIT:
        this.MODE = this.ACTION.EDIT;
        this.idVideo = event.data.id;
        this.form.patchValue(event.data);

        break;
      case this.ACTION.DELETE:
        this.idVideo = event.data.id;
        this.videos = this.videos.filter(e => e !== this.videos[this.idVideo - 1]);
        for (let index = 0; index < this.videos.length; index++) {
          this.videos[index].id = index + 1;
        }

        this.sendvideos.emit( this.videos );
        break;
    }
  }

  registerVideo() {
    this.videos = Object.assign([], this.videos);
    this.videos.push({
      id: this.videos.length + 1,
      url: this.form.controls.url.value,
      description: this.form.controls.description.value
    });
    this.form.reset();

    this.sendvideos.emit( this.videos );
  }
}
