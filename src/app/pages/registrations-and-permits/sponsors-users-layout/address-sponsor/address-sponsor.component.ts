import { Component, OnInit, Input } from '@angular/core';
import {
  FormRegionalAddressComponent
} from 'src/app/pages/components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-sponsor',
  templateUrl: './address-sponsor.component.html',
  styles: []
})
export class AddressSponsorComponent extends FormRegionalAddressComponent {

  @Input() city: AbstractControl | null = new FormControl();

}
