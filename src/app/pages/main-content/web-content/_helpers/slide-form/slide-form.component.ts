import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
  styleUrls: ['./slide-form.component.scss']
})
export class SlideFormComponent {

  @Input() data: any = []; // <!-- To update slider

  mode = 'CREATE'; // <-- Use a constant

  formSlide: FormGroup = new FormGroup({
    description: new FormControl('', [])
    // slider <-- Form Control when you have it
  });

  onSubmit() {

    //  Create
    if (this.mode) {

      // Save state data

    } else { // <-- Edit

      // Save state data

    }

  }
}
