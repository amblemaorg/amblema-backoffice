import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AddressState, SetStateSelected } from 'src/app/store/_address/address.action';
import { Observable } from 'rxjs';
import { Statal, Municipality } from 'src/app/_models/address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  @Input() address: AbstractControl | null = new FormControl();
  @Input() addressState: AbstractControl | null = new FormControl();
  @Input() addressMunicipality: AbstractControl | null = new FormControl();

  // -- Address State --
  @Select( AddressState.states ) states$: Observable<Statal[]>;
  @Select( AddressState.municipalities ) municipalities$: Observable<Municipality[]>;

  // -- Ng model input controller --
  addressStateSelected: string;
  addressMunicipalitySelected: string;

  constructor(
    private store: Store,
  ) {}

  onAddressSelected(): void {
    this.addressState.setValue(this.addressStateSelected);
    this.store.dispatch( new SetStateSelected( this.addressStateSelected ) );
  }
}
