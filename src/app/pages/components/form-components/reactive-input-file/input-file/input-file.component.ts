import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  template: `
    <div class="form-group">
  
      <label for="file" nbButton outline status="info" class="btn btn-outline-info js-labelFile">
      <input 
        type="file" 
        [name]="id" 
        [id]="id" 
        (change)="handleUpload($event.target.files)"
        class="input-file">
        <nb-icon icon="file-text-outline" class="mr-2"></nb-icon>
        <span class="js-fileName">Cargar archivo</span>
      </label>
    </div>
  `,
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  @Input() control: AbstractControl | null = new FormControl();
  @Input() id: string | null = Math.random().toString();

  constructor() { }

  ngOnInit() {}

  handleUpload(file: File) {
    this.control.setValue( file[0] as File );
  }
}
