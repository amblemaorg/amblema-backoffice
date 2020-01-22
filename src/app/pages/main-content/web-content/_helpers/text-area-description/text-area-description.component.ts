import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-area-description',
  templateUrl: './text-area-description.component.html',
  styleUrls: ['./text-area-description.component.scss']
})
export class TextAreaDescriptionComponent {

  @Input() ID: string | null = '';

  @Input() label: string | null = '';

}
