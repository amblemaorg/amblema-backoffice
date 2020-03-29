import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  template: `
    <div class="form-group">

      <button nbButton outline status="info" class="js-labelFile">
      <input
        type="file"
        [name]="id"
        [id]="id"
        (change)="handleUpload($event.target.files)"
        class="input-file">
        <nb-icon icon="file-text-outline" class="mr-2"></nb-icon>
        <span *ngIf="!control.value" class="js-fileName">Cargar archivo</span>
        <span *ngIf="control.value" class="js-fileName">Archivo seleccionado...</span>
      </button>
      <nb-alert outline="info" *ngIf="control.value" class="mt-3">Nombre del archivo: {{ nameFile }}</nb-alert>
    </div>
  `,
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  @Input() control: AbstractControl | null = new FormControl();
  @Input() id: string | null = Math.random().toString();

  nameFile: string;

  constructor() { }

  ngOnInit() {}

  handleUpload(file: File) {
    this.control.setValue( file[0] as File );
    this.nameFile = file[0].name;
    console.log( file );
  }
}
