import { Component } from '@angular/core';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent {

  options = [
    { value: 'image', label: 'Imagen' },
    { value: 'video', label: 'Video' },
  ];

  onSaveStepTwo(): void {

  }
}
