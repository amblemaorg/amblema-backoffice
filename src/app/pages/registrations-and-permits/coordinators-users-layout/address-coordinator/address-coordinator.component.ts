import { Component, OnInit, Input } from '@angular/core';
import {
  FormRegionaladdressComponent
} from 'src/app/pages/components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-coordinator',
  templateUrl: './address-coordinator.component.html',
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
export class AddressCoordinatorComponent extends FormRegionaladdressComponent {

  @Input() addressHome: AbstractControl | null = new FormControl();
  @Input() addressCity: AbstractControl | null = new FormControl();

}
