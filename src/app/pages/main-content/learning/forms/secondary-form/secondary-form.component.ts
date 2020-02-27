import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-secondary-form',
  templateUrl: './secondary-form.component.html',
  styles: []
})
export class SecondaryFormComponent  {

  form: FormGroup = new FormGroup({
    secondaryTitle: new FormControl('', [Validators.required]),
    secondaryDescription: new FormControl('', [Validators.required])
  });


}
