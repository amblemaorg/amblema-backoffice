import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import {
  AddressState,
  SetStateSelected,
} from 'src/app/store/_address/address.action';
import { Observable } from 'rxjs';
import { Statal, Municipality } from 'src/app/_models/address.model';
import { FORM_MODALITY } from '../../abstract-form-mode';
import { AddressService } from 'src/app/services/address.service';

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
  @Select(AddressState.states) states$: Observable<Statal[]>;
  @Select(AddressState.municipalities) municipalities$: Observable<
    Municipality[]
  >;

  // -- Ng model input controller --
  addressStateSelected: string;
  addressMunicipalitySelected: string;

  // -- Mode Create or edit --
  control: AbstractControl = new FormControl(null, [Validators.required]); // <-- To create or edit
  isEditionMode = false; // <-- Edition = 'true' or selector = 'false'
  isFormOn =
    FORM_MODALITY.CREATE.VALUE ||
    FORM_MODALITY.EDIT.VALUE ||
    FORM_MODALITY.DELETE.VALUE ||
    null; // <--- Create = 'true' or edit = 'false'

  // -- Define actions --
  readonly formMode = FORM_MODALITY;

  constructor(public addressServices: AddressService, public store: Store) {}

  onAddressSelected(): void {
    this.addressState.setValue(this.addressStateSelected);
    this.store.dispatch(new SetStateSelected(this.addressStateSelected));
  }

  onChangeMode(): void {
    // -- Verify that the municipalities exist or state --
    if (this.addressStateSelected || this.addressMunicipalitySelected) {
      this.isEditionMode = true;
    }
  }

  onConfirmAction(mode: string): void {
    if (this.isEditionMode) {
      switch (mode) {
        case FORM_MODALITY.CREATE.VALUE:
          this.addressServices
            .setMunicipality({
              name: this.control.value,
              state: this.addressStateSelected,
            })
            .subscribe((response) => {
              this.resetCrudMunicipality();
            });
          break;
        case FORM_MODALITY.EDIT.VALUE:
          break;
        case FORM_MODALITY.DELETE.VALUE:
          break;
      }
    }
  }

  onCancelAction(): void {
    if (this.isEditionMode) {
      this.resetCrudMunicipality();
    }
  }

  resetCrudMunicipality(): void {
    this.isEditionMode = false;
    this.isFormOn = null;
    this.control.reset();
  }
}
