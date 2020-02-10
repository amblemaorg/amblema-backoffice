import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { State } from '../../../../../models/address.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form-regional-address',
    templateUrl: './form-regional-address.component.html'
})

export class FormRegionalAddressComponent extends AbstractReactive implements OnInit, OnDestroy {

    @Input() state: AbstractControl | null = new FormControl();
    @Input() municipality: AbstractControl | null = new FormControl();

    todo: Subscription;
    states: State[];

    constructor( private stateService: AddressService ) {
        super();
    
        // Get suscription and data
        this.todo = this.stateService.getState().subscribe( (value) => { 
            this.states = value.records as State[];
           
            // Init values
            this.state.setValue(this.states[0].id);
            this.municipality.setValue(this.municipalityData[0].value);
        });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.todo.unsubscribe(); // <-- Free memory
    }

    // Event change state
    onSelectState( value: any ) {   
        
        // Save state in the form
        this.state.setValue(value);
    }

    municipalityData: any = [
        { value: 'Iribarren' },
        { value: 'Bolivar' }
    ];
}
