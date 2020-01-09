import { Component, Input } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { AbstractReactiveComponent } from '../abstract-reactive.component';
import { MESSAGES } from '../../shared/constant/validation-messages-list';


@Component({
  selector: 'app-id-document',
  templateUrl: './id-document.component.html',
  styleUrls: ['./id-document.component.scss'],
})
export class IdDocumentComponent extends AbstractReactiveComponent {

  @Input() controlSelect: AbstractControl | null = null;

  readonly types: any = [{ value: 'V' }, { value: 'J' }, { value: 'E' }];

  message = MESSAGES.DOCUMENT_MESSAGE;

  changeDocument(value: string) {
    switch (value) {
      case 'V':
        this.updateDocumentValidation(7, 8);
        this.message = MESSAGES.DOCUMENT_MESSAGE;
        break;
      case 'E':
        this.updateDocumentValidation(10, 10);
        this.message = MESSAGES.PASSPORT_MESSAGE;
        break;
      case 'J':
        this.updateDocumentValidation(8, 9);
        this.message = MESSAGES.RIF_MESSAGE;
        break;
    }
  }

  private updateDocumentValidation(min: number, max: number) {
    this.control.setValidators([Validators.required, Validators.minLength(min), Validators.maxLength(max)]);
    this.control.updateValueAndValidity();
  }
}
