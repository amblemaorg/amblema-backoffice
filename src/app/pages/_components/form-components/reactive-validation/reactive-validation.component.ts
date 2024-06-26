import { Component, OnChanges, Input } from '@angular/core';
import { MESSAGES } from '../shared/constant/validation-messages-list';

@Component({
  selector: 'app-reactive-validation',
  template: `
    <ng-container *ngIf="errorMessage">
      <div class="alert alert-primary">
        <strong> {{errorMessage}} </strong>
      </div>
    </ng-container>
  `,
})
export class ReactiveValidationComponent implements OnChanges {

  /**
   * 'validationErrors' is reactive form errors.
   * It's nonnull in case if the control is touched and invalid,
   * which is defined on the reactive base component side.
   */
  @Input() validationErrors: object | null = null;

  @Input() patternMessage: string | null = null;

  // Message error return
  errorMessage: string | null = null;

  /**
   * Get message if anything changes in the forms
   */
  ngOnChanges(): void {
    this.errorMessage = this.getErrorMessage();
  }

  getErrorMessage(): string | null {
    const errors: any = this.validationErrors;

    if (errors) {
      return errors.required ? MESSAGES.REQUIRED_MESSAGE :
             (errors.pattern || errors.minlength || errors.maxlength) ? this.patternMessage :
             null;
    }

    return null;
  }
}
