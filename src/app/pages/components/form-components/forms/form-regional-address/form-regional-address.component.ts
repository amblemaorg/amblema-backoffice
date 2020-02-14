import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractReactive } from '../../abstract-reactive';
import { AbstractControl, FormControl } from '@angular/forms';
import { AddressService, DataMunicipality } from 'src/app/services/address.service';
import { State, Municipality } from '../../../../../models/address.model';
import { ACTION } from '../../../../../helpers/text-crud';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { Subscription } from 'rxjs';
import { errorMessages } from 'src/app/helpers/error-manager';

@Component({
    selector: 'app-form-regional-address',
    templateUrl: './form-regional-address.component.html',
})

export class FormRegionalAddressComponent extends AbstractReactive implements OnDestroy {

    // Parse to form
    @Input() state: AbstractControl | null = new FormControl();
    @Input() municipality: AbstractControl | null = new FormControl();

    @Input() submitted: boolean;

    MODE = 'NORMAL';
    CRUD = ACTION;
    inputCRUD: AbstractControl = new FormControl(); // <-- To update

    subscribe: Subscription;

    // Models
    states: State[];
    municipalities: Municipality[];
    nameMuni: string;

    constructor(private addressService: AddressService, private toastr: CustomToastrService) {
        super();
        this.initAddress();
    }

    ngOnDestroy(): void {
        if (this.subscribe) {
            this.subscribe.unsubscribe();
        }
    }

    onSelectState(id: any) {
        this.state.setValue(id); // <-- Save state in the form

        // Filter and get data
        this.subscribe = this.addressService.getMunicipalityByState(this.state.value).subscribe(response => {

            if (response.length > 0) {
                this.municipalities = response as Municipality[];
                this.municipality.setValue(this.municipalities[0].id);

                this.fillValuesMunicipality(this.municipality.value);
            } else {
                // Clear municipalities when is empty
                this.municipality.setValue(null);
                this.municipalities = [];
            }
        });

        this.resetForm();
    }

    onSelectMunicipality(id: any) {
        this.municipality.setValue(id); // <-- Save municipalities in the form
        this.fillValuesMunicipality(id);
    }

    private fillValuesMunicipality(id: string): void {

        // This is for fill the input to update
        this.municipalities.forEach((value, key, map) => {
            if (value.id === id) {
                this.inputCRUD.setValue(value.name);
                this.nameMuni = value.name;
            }
        });

    }

    private initAddress(): void {

        // Get suscription and data
        this.subscribe = this.addressService.getStates().subscribe((value) => {
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

    /**
     * CRUD API
     */

    onConfirm() {

        // Prepare data
        const data: DataMunicipality = {
            state: this.state.value,
            name: this.inputCRUD.value
        };

        switch (this.MODE) {
            case this.CRUD.CREATE:
                this.addressService.setMunicipality(data).subscribe(response => {
                    this.municipalities.push(response as any); // <-- Add in the list
                    this.toastr.registerSuccess('Registro', 'Municipio registrado');
                    this.resetForm();
                }, (err: any) => {
                    if (Number(err.error.name[0].status) === errorMessages.duplicated.status) {
                        this.toastr.error('Error', errorMessages.duplicated.msg);
                    }
                });
                break;
            case this.CRUD.EDIT:

                // Parse id and rename
                this.addressService.updateMunicipality(this.municipality.value, { name: this.inputCRUD.value, state: this.state.value })
                    .subscribe(response => {

                        // Refresh the updated data.
                        this.municipalities.forEach((value, key, map) => {
                            if (value.id === response.id) {
                                this.municipalities[key] = response;
                            }
                        });

                        this.toastr.updateSuccess('Actualización', 'Municipio actualizado');
                        this.resetForm();
                    }, (err: any) => {
                        if (Number(err.error.name[0].status) === errorMessages.duplicated.status) {
                            this.toastr.error('Error', errorMessages.duplicated.msg);
                        }
                    });
                break;
            case this.CRUD.DELETE:
                this.addressService.deleteMunicipality(this.municipality.value).subscribe(response => {

                    // Delete and refresh the list
                    this.municipalities.splice(this.municipalities.indexOf(this.municipality.value), 1);
                    this.municipality.setValue(this.municipalities[0].id);

                    this.toastr.deleteRegister('Eliminación', 'Se ha eliminado el municipio seleccionado');
                    this.resetForm();
                });
                break;
        }
    }
}
