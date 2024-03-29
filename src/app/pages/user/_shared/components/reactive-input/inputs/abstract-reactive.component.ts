import { OnInit, DoCheck, Input, Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive()
export abstract class AbstractReactiveComponent implements OnInit, DoCheck {
  @Input() id: string | null = null;

  // -- 'control' is a reactive form validator/value controller --
  @Input() control: AbstractControl | null = null;
  @Input() label: string = null;
  @Input() placeholder: string | null = '';
  @Input() type: string | null = 'text';
  @Input() patternMessage?: string;
  @Input() disabled: boolean | null = false;

  validationErrors: object = null;

  ngOnInit() {}

  ngDoCheck() {
    this.validationErrors =
      this.control.touched && this.control.invalid ? this.control.errors : null;
  }
}
