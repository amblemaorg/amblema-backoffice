import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent implements OnInit {

  options = [
    { value: '1', label: 'Imagen' },
    { value: '2', label: 'Video' },
  ];

  option;

  formMedia: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]), 
    type: new FormControl(this.options[0].value)
  })

  ngOnInit(): void {
    this.option = this.options[0].value;
  }

  onSaveStepTwo(): void {

  }
}
