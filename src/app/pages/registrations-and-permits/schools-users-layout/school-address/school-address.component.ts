import { Component, Input } from '@angular/core';
import {
  FormRegionalAddressComponent
} from 'src/app/pages/components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-school-address',
  templateUrl: './school-address.component.html',
  styles: [`
  .button-left {
    border-radius: 0!important;
    border-top-left-radius: .25rem!important;
    border-bottom-left-radius: .25rem!important;
}

.button-right {
    border-radius: 0!important;
    border-top-right-radius: .25rem!important;
    border-bottom-right-radius: .25rem!important;
}

  `]
})
export class SchoolAddressComponent extends FormRegionalAddressComponent {
  @Input() addressCity: AbstractControl | null = new FormControl();
}
