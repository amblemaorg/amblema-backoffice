import { Component, Input, OnInit } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-regional-address',
    templateUrl: './form-regional-address.component.html'
})

export class FormRegionalAddressComponent extends AbstractReactive implements OnInit {

    @Input() state: AbstractControl | null = new FormControl();
    @Input() municipality: AbstractControl | null = new FormControl();

    statesData: any = [
        { value: 'Lara' },
        { value: 'Caracas' }
    ];

    municipalityData: any = [
        { value: 'Iribarren' },
        { value: 'Bolivar' }
    ];

    ngOnInit(): void {
        // Init values.
        this.state.setValue(this.statesData[0].value);
        this.municipality.setValue(this.municipalityData[0].value);
    }
}
