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

  /** inputs */
  @Input() state: AbstractControl | null = new FormControl(null);
  @Input() municipality: AbstractControl | null = new FormControl(null);
  @Input() address: AbstractControl | null = new FormControl('');
  @Input() submitted: boolean | null = false;

  /** list from api */
  states: Array<any>;
  municipalities: Array<any>;

  /** model ng selected */
  stateSelected: string;
  municipalitySelected: string;

  modality: Modality = 'view';

  subscription = new Subscription();

  constructor(
    private addressService: AddressService
  ) { }

  async ngOnInit() {
    this.states = await this.addressService.getStates().toPromise().then(response => response);

    /** state change refresh munipalities */
    this.subscription.add(this.state.valueChanges.subscribe(async () => {

      /** set value by default */
      this.stateSelected = this.state.value ? this.state.value : this.stateSelected;

      /** clear previous selections */
      this.clearMunicipality();

      /** update municipalities */
      if (this.stateSelected && (typeof this.stateSelected !== 'object')) {
        this.municipalities = await this.addressService.getMunicipalityByState(this.stateSelected).toPromise().then(response => response);
        this.municipalitySelected = this.municipality.value
      }
    }))
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  clearMunicipality(): void {
    this.municipalities = [];
    this.municipality.setValue(null);
    this.municipalitySelected = null;
  }

  onCreateMunicipality(): void {

  }

  onEditMunicipality(): void {

  }

  onDeleteMunicipality(): void {

  }
}

type Modality = "view" | "edition";