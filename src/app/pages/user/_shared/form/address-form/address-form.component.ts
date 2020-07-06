import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import {
  AddressState,
  SetStateSelected,
  SetMunicipality,
  DeleteMunicipality,
  UpdateMunicipality,
} from 'src/app/store/_address/address.action';
import { Observable, Subscription } from 'rxjs';
import { Statal, Municipality } from 'src/app/_models/address.model';
import { FORM_MODALITY } from '../../abstract-form-mode';
import { AddressService } from 'src/app/services/address.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnDestroy {
  @Input() address: AbstractControl | null = new FormControl();
  @Input() addressState: AbstractControl | null = new FormControl();
  @Input() addressMunicipality: AbstractControl | null = new FormControl();

  // -- Address State --
  @Select(AddressState.states) states$: Observable<Statal[]>;
  @Select(AddressState.municipalities) municipalities$: Observable<
    Municipality[]
  >;

  public subscriptionServices: Subscription;

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
    null; // <--- Is form on?

  // -- Define actions --
  readonly formMode = FORM_MODALITY;

  constructor(
    public toastService: CustomToastrService,
    public addressServices: AddressService,
    public store: Store
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptionServices) {
      this.subscriptionServices.unsubscribe();
    }
  }

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

  onSelectMunicipality(): void {
    this.subscriptionServices = this.municipalities$.subscribe((response) => {
      response.find((municipality) => {
        if (municipality.id === this.addressMunicipalitySelected) {
          this.control.setValue(municipality.name);
        }
      });
    });
  }

  onConfirmAction(mode: string): void {
    if (this.isEditionMode) {
      switch (mode) {
        // -- Create --
        case FORM_MODALITY.CREATE.VALUE:
          this.subscriptionServices = this.addressServices
            .setMunicipality({
              name: this.control.value,
              state: this.addressStateSelected,
            })
            .subscribe(
              (response) => {
                this.store.dispatch(new SetMunicipality(response));
                this.toastService.registerSuccess(
                  'Registro',
                  'Municipio creado'
                );
                this.resetCrudMunicipality();
              },
              (err) => {
                console.log(err);
                this.toastService.error(
                  'Error',
                  'Al paracer el nombre esta duplicado o hay inconvenientes.'
                );
              }
            );
          break;
        // -- Edit --
        case FORM_MODALITY.EDIT.VALUE:
          this.subscriptionServices = this.addressServices
            .updateMunicipality(this.addressMunicipalitySelected, {
              id: this.addressMunicipalitySelected,
              state: this.addressStateSelected,
              name: this.control.value,
            })
            .subscribe(
              (response) => {
                this.toastService.updateSuccess(
                  'Actualización',
                  'Municipio actualizado'
                );
                this.store.dispatch(new UpdateMunicipality(response));
                this.resetCrudMunicipality();
                this.addressMunicipalitySelected = response.id;
              },
              (err) => {
                this.toastService.error(
                  'Error',
                  'Al paracer el nombre esta duplicado o hay inconvenientes.'
                );
              }
            );

          break;
        // -- Delete --
        case FORM_MODALITY.DELETE.VALUE:
          this.subscriptionServices = this.addressServices
            .deleteMunicipality(this.addressMunicipalitySelected)
            .subscribe((response) => {
              this.store.dispatch(
                new DeleteMunicipality(this.addressMunicipalitySelected)
              );
              this.toastService.deleteRegister(
                'Eliminación',
                'Se ha eliminado el municipio seleccionado'
              );
              this.resetCrudMunicipality();
            });
          break;
      }
    }
  }

  resetCrudMunicipality(): void {
    this.isEditionMode = false;
    this.addressMunicipalitySelected = null;
    this.isFormOn = null;
    this.control.reset();
  }
}
