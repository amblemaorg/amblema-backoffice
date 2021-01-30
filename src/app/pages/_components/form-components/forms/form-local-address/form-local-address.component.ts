import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressService, DataMunicipality } from 'src/app/services/address.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';
import { errorMessages } from 'src/app/_helpers/text-content/error-manager';
import { FormLocalAddressAbstractComponent } from './form-local-address.abstract.component';

@Component({
  selector: 'app-form-local-address',
  templateUrl: './form-local-address.component.html',
  styleUrls: ['./form-local-address.component.scss']
})
export class FormLocalAddressComponent extends FormLocalAddressAbstractComponent implements OnInit {

  /** permission crud municipality */
  public canCreate = new AuthService().isAllowed(ALL_ACTIONS.MUNICIPALITY_CREATE);
  public canEdit = new AuthService().isAllowed(ALL_ACTIONS.MUNICIPALITY_EDIT);
  public canDelete = new AuthService().isAllowed(ALL_ACTIONS.MUNICIPALITY_DELETE);

  /** list from api */
  states: Array<any>;
  municipalities: Array<any>;

  /** model ng selected */
  stateSelected: string;
  municipalitySelected: string;

  /** view and edition mode */
  modality: Modality = 'view';
  municipalityInput = new FormControl('');

  subscription = new Subscription();

  constructor(
    private cd: ChangeDetectorRef,
    private addressService: AddressService,
    private toastr: CustomToastrService
  ) { super(); }

  async ngOnInit() {
    this.states = await this.addressService.getStates().toPromise().then(response => response);

    /** state change refresh munipalities */
    this.subscription.add(this.state.valueChanges.subscribe(async (response) => {

      this.stateSelected = null; // clear

      /** set value by default */
      this.stateSelected = this.state.value ? this.state.value :
        response ? '' : this.stateSelected;

      this.fullReset();

      /** update municipalities */
      if (this.stateSelected && (typeof this.stateSelected !== 'object')) {
        this.municipalities = await this.addressService.getMunicipalityByState(this.stateSelected).toPromise().then(response => response);
        this.municipalitySelected = this.municipality.value;
      }
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  /**
   * on prepare crud
   */

  onPrepareCreation() {
    this.modality = 'create';
    this.municipalityInput.reset();
  }

  onPrepareEdition() {
    this.modality = 'edit';
    this.fillMunicipalityInput();
  }

  onPrepareDelete() {
    this.modality = 'delete';
    this.fillMunicipalityInput();
  }

  /**
   * crud municipality
   */

  onCreateMunicipality(data: DataMunicipality): void {
    this.subscription.add(this.addressService.setMunicipality(data).subscribe((response) => {
      this.municipalities.push(response);
      this.toastr.registerSuccess('Registro', 'Municipio registrado');
      this.clearMiniForm();
    }, (err: any) => {
      if (Number(err.error.name[0].status) === errorMessages.duplicated.status) {
        this.toastr.error('Error', errorMessages.duplicated.msg);
      }
    }));
  }

  onEditMunicipality(): void {
    this.subscription.add(this.addressService.updateMunicipality(
      this.municipalitySelected, {
      name: this.municipalityInput.value,
      state: this.stateSelected
    }).subscribe(response => {

      const municipalityIndex = this.municipalities.findIndex((item => item.id === this.municipalitySelected));
      this.municipalities[municipalityIndex] = response;

      this.toastr.updateSuccess(
        'Actualización',
        'Municipio actualizado'
      );
      this.modality = 'view';

    }, (err: any) => {
      if (
        Number(err.error.name[0].status) ===
        errorMessages.duplicated.status
      ) {
        this.toastr.error('Error', errorMessages.duplicated.msg);
      }
    }));
  }

  onDeleteMunicipality(): void {
    this.subscription.add(this.addressService.deleteMunicipality(this.municipalitySelected).subscribe(response => {
      this.municipalities = this.municipalities.filter(
        (item) => item.id !== this.municipalitySelected
      );
      this.clearMiniForm();
      this.toastr.deleteRegister(
        'Eliminación',
        'Se ha eliminado el municipio seleccionado'
      );
    }));
  }

  /**
   * actions
   */

  onConfirmAction(value: Modality): void {

    switch (value) {
      case 'create':
        this.onCreateMunicipality({
          name: this.municipalityInput.value,
          state: this.stateSelected
        });
        break;
      case 'edit':
        this.onEditMunicipality();
        break;

      case 'delete':
        this.onDeleteMunicipality();
        break;
    }
  }

  /**
   * auxiliary functions
   */

  private clearMiniForm(): void {
    this.municipalityInput.reset();
    this.modality = 'view';
    this.municipalitySelected = null;
  }

  private fullReset(): void {
    /** clear previous selections */
    this.clearMunicipality();
    this.modality = 'view';
    this.clearMiniForm();
  }

  /** Update the field on the mini form */
  private fillMunicipalityInput(): void {
    this.municipalityInput.setValue(this.municipalities.find(item => item.id === this.municipalitySelected).name);
  }

  private clearMunicipality(): void {
    this.municipalities = [];
    this.municipality.setValue(null);
    this.municipalitySelected = null;
  }
}

type Modality = 'view' | 'edit' | 'create' | 'delete';
