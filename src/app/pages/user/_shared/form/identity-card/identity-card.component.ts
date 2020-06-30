import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../../reactive-input/_shared/validation-patterns';

@Component({
  selector: 'app-identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.scss'],
})
export class IdentityCardComponent implements OnInit {
  @Input() cardType: AbstractControl | null = new FormControl();
  @Input() cardId: AbstractControl | null = new FormControl();

  public msg: string; // <-- Pattern message
  public tooltipMsg: string;

  types = [
    {
      label: 'V',
      value: '1',
      msg: 'Cédula inválida, ingresa una cédula correcta',
    },
    { label: 'J', value: '2', msg: 'RIF inválido, ingresa un RIF correcto' },
    {
      label: 'E',
      value: '3',
      msg: 'Pasaporte inválido, ingresa un pasaporte correcto',
    },
  ];

  constructor() {}

  ngOnInit() {
    // -- Initial validation --
    this.updateValidation(this.cardType.value);
  }

  updateValidation(type: string): void {
    // -- Update validation and set the correct message --
    switch (type) {
      case this.types[0].value:
        this.tooltipMsg = `Mínimo 7 y máximo 8 caracteres`;
        this.msg = this.types[0].msg;
        this.setUpValidation(7, 8);
        break;
      case this.types[1].value:
        this.tooltipMsg = `Mínimo 8 y máximo 9 caracteres`;
        this.msg = this.types[1].msg;
        this.setUpValidation(8, 9);
        break;
      case this.types[2].value:
        this.tooltipMsg = `Mínimo 10 y máximo 10 caracteres`;
        this.msg = this.types[2].msg;
        this.setUpValidation(10, 10);
        break;
    }
  }

  private setUpValidation(min: number, max: number): void {
    this.cardId.setValidators([
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern(NUMBER_PATTERN),
    ]);

    this.cardId.updateValueAndValidity();
  }
}
