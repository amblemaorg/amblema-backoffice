import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
})
export class ContentTextComponent {

  @Input() data: any = []; // <-- To update

  @Output() get = new EventEmitter<any>(); // <-- Get data content text

  formContentText: FormGroup = new FormGroup({
    about: new FormControl(),
    enviroment: new FormControl(),
    reading: new FormControl(),
    math: new FormControl()
  });

  constructor() { }
}
