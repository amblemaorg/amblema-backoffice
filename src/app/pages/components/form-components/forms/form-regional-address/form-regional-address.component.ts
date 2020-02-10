import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl } from '@angular/forms';
import { AddressService, DataMunicipality } from 'src/app/services/address.service';
import { State, Municipality } from '../../../../../models/address.model';
import { Subscription } from 'rxjs';
import { ACTION } from '../../../../../helpers/text-crud';

@Component({
    selector: 'app-form-regional-address',
    templateUrl: './form-regional-address.component.html'
})

export class FormRegionalAddressComponent extends AbstractReactive implements OnDestroy {

    // Parse to form
    @Input() state: AbstractControl | null = new FormControl();
    @Input() municipality: AbstractControl | null = new FormControl();

    MODE = 'NORMAL';
    CRUD = ACTION;
    inputCRUD: AbstractControl = new FormControl();

    todo: Subscription; // <-- Unsubscribe services

    // Models
    states: State[];
    municipalities: Municipality[];

    constructor(private addressService: AddressService) {
        super();
        this.initAddress();
    }

    ngOnDestroy(): void {
        this.todo.unsubscribe(); // <-- Free memory
    }

    onSelectState(value: any) {
        this.state.setValue(value); // <-- Save state in the form
        this.resetForm();
    }

    onSelectMunicipality(value: any) {
        this.municipality.setValue(value); // <-- Save municipalities in the form
    }

    private initAddress(): void {
        // Get suscription and data
        this.todo = this.addressService.getStates().subscribe((value) => {
            this.states = value;

            // Init
            this.state.setValue(null);
            this.municipality.setValue(null);
        });
    }

    private resetForm() {
        this.MODE = 'NORMAL';
        this.inputCRUD.reset();
    }

    onConfirm() {

        // Prepare data
        const data: DataMunicipality = {
            state: this.state.value,
            name: this.inputCRUD.value
        };

        switch (this.MODE) {
            case this.CRUD.CREATE:
                this.addressService.setMunicipality(data).subscribe((response: any) => {

                });
                break;
            case this.CRUD.EDIT:

                break;
            case this.CRUD.DELETE:
                break;
        }
    }
}