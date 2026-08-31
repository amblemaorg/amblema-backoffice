import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { Validators } from '@angular/forms';
import { FileValidator, EXTENSIONS } from '../../../shared/file-validator';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-input-file',
  template: `
    <div class="form-group" *ngIf="control">
      <button
        nbButton
        [ngClass]="{ 'mb-3': !control.value && submitted }"
        outline
        status="info"
        class="js-labelFile"
      >
        <input
          type="file"
          [name]="id"
          [id]="id"
          (change)="handleUpload($event.target.files)"
          class="input-file"
        />
        <nb-icon icon="file-text-outline" class="mr-2"></nb-icon>
        <span *ngIf="!control.value" class="js-fileName">Adjuntar archivo</span>
        <span *ngIf="control.value" class="js-fileName"
          >Archivo seleccionado...</span
        >
      </button>

      <nb-alert outline="info" *ngIf="control.value" class="mt-3 d-flex align-items-center justify-content-between">
        <div>
          <a *ngIf="url" [href]="url" target="_blank">{{ nameFile }}</a>
          <span *ngIf="!url">{{ nameFile }}</span>
        </div>
        <button
          type="button"
          nbButton
          status="danger"
          size="tiny"
          class="ml-2"
          (click)="clearFile()"
        >
          <nb-icon icon="trash-2-outline"></nb-icon> Eliminar
        </button>
      </nb-alert>

      <app-reactive-validation
        [patternMessage]="patternMsg"
        [validationErrors]="validationErrors"
      ></app-reactive-validation>
      <nb-alert status="danger" *ngIf="control.errors && submitted" class="mt-3"
        >Las extensiones validas son: pdf, docx y pptx
      </nb-alert>
    </div>
  `,
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent
  extends AbstractReactive
  implements AfterViewInit, OnChanges {
  nameFile: string;
  url: string = null;

  constructor(
    private toast: CustomToastrService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnChanges(): void {
    if (this.control) {
      if (this.control.value) {
        if (
          typeof this.control.value.url === 'string' ||
          this.control.value.url instanceof String
        ) {
          this.url = this.control.value.url;
          this.nameFile = this.control.value.name;
        } else if (this.control.value.name) {
          this.url = null;
          this.nameFile = this.control.value.name;
        } else {
          this.url = null;
          this.nameFile = null;
        }
      } else {
        this.url = null;
        this.nameFile = null;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.control) {
      this.cd.detectChanges();
    }
  }

  clearFile(): void {
    if (this.control) {
      this.control.setValue(null);
      this.url = null;
      this.nameFile = null;
      this.control.setValidators([]);
      this.control.updateValueAndValidity();
      this.cd.detectChanges();
    }
  }

  handleUpload(event: any) {
    // Get file
    const file = event[0];

    if (file) {
      this.control.setValue(file as File);
      this.nameFile = file.name;
    }
  }
}
