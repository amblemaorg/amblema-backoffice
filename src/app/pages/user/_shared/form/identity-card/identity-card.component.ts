import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.scss'],
})
export class IdentityCardComponent implements OnInit {
  @Input() cardType: AbstractControl | null = new FormControl();
  @Input() cardId: AbstractControl | null = new FormControl();

  types = [
    { label: 'V', value: '1' },
    { label: 'J', value: '2' },
    { label: 'E', value: '3' },
  ];

  constructor() {}

  ngOnInit() {
    this.updateValidation( this.cardType.value );
  }

  updateValidation(type: string): void {
    switch (type) {
      case this.types[0].value:
        this.cardId.setValidators([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
        ]);
        break;
      case this.types[1].value:
        this.cardId.setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
        ]);

        break;
      case this.types[2].value:
        this.cardId.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]);

        break;
    }

    this.cardId.updateValueAndValidity();
  }
}
