import { Component, Input } from '@angular/core';
import { FormRegionalAddressComponent } from 'src/app/pages/components/form-components/forms/form-regional-address/form-regional-address.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-school-address',
  templateUrl: './school-address.component.html',
  styles: []
})
export class SchoolAddressComponent extends FormRegionalAddressComponent {
  @Input() addressCity: AbstractControl | null = new FormControl();
}
