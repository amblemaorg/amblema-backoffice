import { Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export abstract class AbstractReactiveSelect {
  @Input() control: AbstractControl | null = new FormControl();
}
