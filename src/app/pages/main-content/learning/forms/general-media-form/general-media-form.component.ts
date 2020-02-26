import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent implements OnInit {

  options = [
    { value: 'image', label: 'Imagen' },
    { value: 'video', label: 'Video' },
  ];

  option;

  ngOnInit(): void {
    this.option = this.options[0].value;
  }

  onSaveStepTwo(): void {

  }
}
