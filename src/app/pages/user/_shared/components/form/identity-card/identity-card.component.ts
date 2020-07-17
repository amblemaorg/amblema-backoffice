import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { NUMBER_PATTERN } from '../../../components/reactive-input/_shared/validation-patterns';
import { DOCUMENT_TYPE } from './document-type-values';

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

  public types = [DOCUMENT_TYPE.VENEZUELAN, DOCUMENT_TYPE.RIF, DOCUMENT_TYPE.PASSPORT];

  constructor() { }

  ngOnInit() {
    // -- Initial validation --
    this.updateValidation(this.cardType.value);
  }

  updateValidation(type: string): void {
    // -- Update validation and set the correct message --
    switch (type) {
      case DOCUMENT_TYPE.VENEZUELAN.VALUE:
        this.tooltipMsg = `Mínimo 7 y máximo 8 caracteres`;
        this.msg = DOCUMENT_TYPE.VENEZUELAN.MSG;
        this.setUpValidation(7, 8);
        break;
      case DOCUMENT_TYPE.RIF.VALUE:
        this.tooltipMsg = `Mínimo 8 y máximo 9 caracteres`;
        this.msg = DOCUMENT_TYPE.RIF.MSG;
        this.setUpValidation(8, 9);
        break;
      case DOCUMENT_TYPE.PASSPORT.VALUE:
        this.tooltipMsg = `Mínimo 10 y máximo 10 caracteres`;
        this.msg = DOCUMENT_TYPE.PASSPORT.MSG;
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
