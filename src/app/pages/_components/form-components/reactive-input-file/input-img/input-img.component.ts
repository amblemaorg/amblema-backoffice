import { Component, OnInit, Input } from '@angular/core';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-input-img',
  template: `
    <div
      style="height: auto;"
      class="custom-file d-flex justify-content-center"
      [ngClass]="{
        'justify-content-lg-start': align == 'left',
        'justify-content-lg-center': align == 'center',
        'justify-content-lg-end': align == 'right'
      }"
    >
      <label
        for="file"
        class="mb-0 btn btn-tertiary js-labelFile
      border border-info d-flex align-items-center justify-content-center"
      >
        <input
          type="file"
          [name]="id"
          [id]="id"
          class="input-file"
          (change)="onLoadPicture($event)"
          (click)="onClick($event)"
        />
        <img
          *ngIf="control.value"
          [src]="control.value"
          class="img-fluid position-absolute w-100 h-100"
          alt=""
        />
        <i class="text-info fa fa-camera fa-2x"></i>
      </label>
    </div>
  `,
  styleUrls: ['./input-img.component.scss'],
})
export class InputImgComponent implements OnInit {
  @Input() control: AbstractControl | null = new FormControl();
  @Input() align: string | null = 'center';
  @Input() url: string | null = null;
  @Input() id: string | null = String(Math.random());

  // To validate the file
  readonly pattern = /image-*/;

  // Get size on bytes
  private size: number;

  private pictureBase64 = '';

  constructor(
    private compress: NgxImageCompressService,
    private toast: CustomToastrService
  ) {}

  ngOnInit() {
    this.pictureBase64 = this.url ? this.url : this.pictureBase64;
  }

  onClick(event) {
    event.target.value = '';
  }

  onLoadPicture(event: any) {
    // Get file
    const file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    // Instance reader
    const reader = new FileReader();

    // Get file's size on bytes, convert to Kb
    this.size = event.target.files[0].size / 1000;

    /**
     * So that an error does not occur if the user cancels
     * the action of loading an image
     */
    if (file) {
      if (!this.isValidImage(file)) {
        this.toast.error('Error de archivo', 'Carga una image valida');
        return false;
      }

      // Convert binary file
      reader.onload = this.convertLoad.bind(this);

      // Read the binary
      reader.readAsDataURL(file);

      return true;
    }
  }

  isValidImage(file): boolean {
    return file.type.match(this.pattern) ? true : false;
  }

  convertLoad(event) {
    // Get target
    const reader = event.target;
    // Instance a object of type image
    const img = new Image();


    // Save on the source
    img.src = reader.result;


    // Compress the image
    if (this.size > 800) {
      this.compress.compressFile(reader.result, -1, 35, 35).then((result) => {
        this.pictureBase64 = result;
        this.control.setValue(this.pictureBase64 as string); // <-- This for your submit form
      });
    } else {
      // No compress

      img.onload = () => {
        //  String base 64
        this.pictureBase64 = reader.result;
        this.control.setValue(this.pictureBase64 as string); // <-- This for your submit form
        return true;
      };
    }
  }
}
