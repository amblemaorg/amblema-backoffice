import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormLocalAddressAbstractComponent } from 'src/app/pages/_components/form-components/forms/form-local-address/form-local-address.abstract.component';
@Component({
  selector: 'app-school-address',
  templateUrl: './school-address.component.html',
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

export class SchooladdressComponent extends FormLocalAddressAbstractComponent {
  @Input() addressCity: AbstractControl | null = new FormControl();
  @Input() addressZoneType: AbstractControl | null = new FormControl();
  @Input() addressZone: AbstractControl | null = new FormControl();

  zoneType = [
    { value: '1', label: 'Sector' },
    { value: '2', label: 'Barrio' },
    { value: '3', label: 'Caserio' },
  ];
}
