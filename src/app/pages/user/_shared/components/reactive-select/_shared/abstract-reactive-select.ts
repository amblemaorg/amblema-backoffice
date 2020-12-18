import { Input, Directive } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive()
export abstract class AbstractReactiveSelect {
  @Input() control: AbstractControl | null = new FormControl();
}
