import { Component, OnInit, Input } from '@angular/core';
import { FormRegionalAddressComponent } from 'src/app/pages/components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-coordinator',
  templateUrl: './address-coordinator.component.html',
  styles: []
})
export class AddressCoordinatorComponent extends FormRegionalAddressComponent {

  @Input() addressHome: AbstractControl | null = new FormControl();
  @Input() addressCity: AbstractControl | null = new FormControl();

}
