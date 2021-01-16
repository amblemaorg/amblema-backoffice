import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormLocalAddressAbstractComponent } from 'src/app/pages/_components/form-components/forms/form-local-address/form-local-address.abstract.component';

@Component({
  selector: 'app-address-coordinator',

  templateUrl: './address-coordinator.component.html',
  styles: [
    `
      .button-left {
        border-radius: 0 !important;
        border-top-left-radius: 0.25rem !important;
        border-bottom-left-radius: 0.25rem !important;
      }

      .button-right {
        border-radius: 0 !important;
        border-top-right-radius: 0.25rem !important;
        border-bottom-right-radius: 0.25rem !important;
      }
    `,
  ],
})
export class AddressCoordinatorComponent extends FormLocalAddressAbstractComponent {
  @Input() addressHome: AbstractControl | null = new FormControl();
  @Input() addressCity: AbstractControl | null = new FormControl();
}
