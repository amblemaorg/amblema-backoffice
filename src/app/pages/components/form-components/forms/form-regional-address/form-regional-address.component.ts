import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { State, Municipality } from '../../../../../models/address.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form-regional-address',
    templateUrl: './form-regional-address.component.html'
})

export class FormRegionalAddressComponent extends AbstractReactive implements OnInit, OnDestroy {

    // Parse from form
    @Input() state: AbstractControl | null = new FormControl();
    @Input() municipality: AbstractControl | null = new FormControl();

    todo: Subscription;

    // Models
    states: State[];
    municipalities: Municipality[];

    constructor( private stateService: AddressService ) {
        super();
    
        // Get suscription and data
        this.todo = this.stateService.getStates().subscribe( (value) => { 
            this.states = value;

            // Init values
            this.state.setValue(this.states[0].id);
            //this.municipality.setValue(this.municipalityData[0].value);
    
            // Get update list municipalities
            
        });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.todo.unsubscribe(); // <-- Free memory
    }

    // Event change state
    onSelectState( value: any ) {   
        this.state.setValue(value); // <-- Save state in the form
    }

    onSelectMunicipality(value: any) {
        this.municipality.setValue(value); // <-- Save municipalities in the form
    }

}
