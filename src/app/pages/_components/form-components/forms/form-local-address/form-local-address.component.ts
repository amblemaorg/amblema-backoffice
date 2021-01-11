import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-form-local-address',
  templateUrl: './form-local-address.component.html',
  styleUrls: ['./form-local-address.component.scss']
})
export class FormLocalAddressComponent implements OnInit {

  // inputs
  @Input() state: AbstractControl | null = new FormControl(null);
  @Input() municipality: AbstractControl | null = new FormControl(null);

  // list from api
  states: any[];
  municipalities: any[];

  // model ng selected
  stateSelected: string;
  municipalitySelected: string;

  subscription: Subscription;

  constructor(
    private addressService: AddressService
  ) {
    // state change refresh munipalities
    this.subscription = this.state.valueChanges.subscribe(async (response) => {
      
      // update municipalities
      this.municipalities = await this.addressService.getMunicipalityByState(response).toPromise().then(response => response);
    });
  }

  async ngOnInit() {
    this.stateSelected = this.state.value;
    this.municipalitySelected = this.municipality.value;

    this.states = await this.addressService.getStates().toPromise().then(response => response);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}