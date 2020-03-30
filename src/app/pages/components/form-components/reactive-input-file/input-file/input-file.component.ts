import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { Validators } from '@angular/forms';
import { FileValidator, EXTENSIONS } from '../../../shared/file-validator';

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
      <nb-alert outline="info" *ngIf="control.value" class="mt-3">{{ nameFile }}</nb-alert>
      <app-reactive-validation [patternMessage]='patternMsg' [validationErrors]="validationErrors"></app-reactive-validation>

      <nb-alert status="danger" *ngIf="control.errors && submitted" class="mt-3">Las extensiones validas son: pdf, docx y pptx </nb-alert>

    </div>
  `,
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent extends AbstractReactive implements AfterViewInit {

  nameFile: string;

  constructor( private cd: ChangeDetectorRef ) { super(); }

  ngAfterViewInit(): void {
    this.control.setValidators( [Validators.required, FileValidator.fileExtensions(EXTENSIONS)] );
    this.control.updateValueAndValidity();
    this.cd.detectChanges();
  }

  handleUpload(file: File) {
    this.control.setValue( file[0] as File );
    this.nameFile = file[0].name;
  }
}
