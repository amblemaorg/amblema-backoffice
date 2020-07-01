import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  @Input() address: AbstractControl | null = new FormControl();
  @Input() addressState: AbstractControl | null = new FormControl();
  @Input() addressMunicipality: AbstractControl | null = new FormControl();


}
