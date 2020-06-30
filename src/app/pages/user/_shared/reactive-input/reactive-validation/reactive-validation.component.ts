import { Component, Input, OnChanges } from '@angular/core';
import { FILLING_NEEDED_MESSAGE, MIN_MESSAGE, MAX_MESSAGE } from '../_shared/validation-messages';
import { PATTERNS_LIST } from '../_shared/validation-patterns';

@Component({
  selector: 'app-reactive-validation',
  templateUrl: './reactive-validation.component.html',
  styles: []
})
export class ReactiveValidationComponent implements OnChanges {

  /**
   * 'validationErrors' is reactive form errors.
   * It's nonnull in case if the control is touched and invalid,
   * which is defined on the reactive base component side.
   */
  @Input() validationErrors: object | null = null;

  @Input() alternMessage?: string;

  errorMessage: string | null = null;

  ngOnChanges(): void {
    this.errorMessage = this.getErrorMessage();
  }

  getErrorMessage(): string | null {
    const errors: any = this.validationErrors;

    if (errors) {
      return errors.required ? FILLING_NEEDED_MESSAGE  // <-- Data should be filled
        : errors.minlength ? `${errors.minlength.requiredLength} ${MIN_MESSAGE}` // <-- Data should be min
        : errors.maxlength ? `${errors.maxlength.requiredLength} ${MAX_MESSAGE}` // <-- Data should be max
        : errors.pattern ? this.alternMessage // <-- Data should match pattern
        : null; // <-- Data is filled correctly
    }
    return null;
  }

  /**
   * Method 'getPatternMessage' finds proper pattern message form patterns list
   * and returns the message.
   */
  getPatternMessage(requiredPattern: string): string {
    return PATTERNS_LIST.filter(x => x.PATTERN === requiredPattern)[0].MESSAGE;
  }
}
