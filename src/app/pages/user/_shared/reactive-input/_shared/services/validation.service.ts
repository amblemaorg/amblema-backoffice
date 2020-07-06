import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   * Method 'markAllFormFieldsAsTouched' validates if all control of the input form group are valid.
   * If not, it marks them and the entire form touched to trigger required validation procedures.
   */
  markAllFormFieldsAsTouched(form: AbstractControl): void {
    form.markAsDirty({ onlySelf: true });
    form.markAsTouched({ onlySelf: true });

    if (form instanceof FormArray || form instanceof FormGroup) {
      Object.values(form.controls).forEach(this.markAllFormFieldsAsTouched);
    }
  }
}
