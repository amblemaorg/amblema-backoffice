import { Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export abstract class FormLocalAddressAbstractComponent {
  /** inputs */
  @Input() public state: AbstractControl | null = new FormControl(null);
  @Input() public municipality: AbstractControl | null = new FormControl(null);
  @Input() public address: AbstractControl | null = new FormControl('');
  @Input() public submitted: boolean | null = false;
}
