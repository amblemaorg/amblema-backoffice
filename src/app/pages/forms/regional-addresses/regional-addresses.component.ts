import { Component, Input } from '@angular/core';
import { AbstractReactiveComponent } from '../reactive-form-components/abstract-reactive.component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-regional-addresses',
  templateUrl: './regional-addresses.component.html',
  styleUrls: ['./regional-addresses.component.scss']
})
export class RegionalAddressesComponent extends AbstractReactiveComponent {

  @Input() state: AbstractControl | null = null;
  @Input() municipality: AbstractControl | null = null;
  
  // Data test
  statesData: any = [
    { value: 'Lara' },
    { value: 'Caracas' }
  ];

  municipalityData: any = [
    { value: 'Iribarren' },
    { value: 'Bolivar' }
  ];
}
