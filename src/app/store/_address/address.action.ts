import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { Statal, Municipality } from 'src/app/_models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { Subscription } from 'rxjs';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';

/**
 * New name added to states, this is to avoid confusion with the NGXS library
 */

export class AddressModel {
  states?: Statal[];
  stateSelected?: Statal;
  availableMunicipalities?: Municipality[];
}

export class GetStates {
  static readonly type = '[GeneralAddress] Get States';
}

export class GetMunicipalities {
  static readonly type = '[GeneralAddress] Get Municipalities';
}

export class SetMunicipality {
  static readonly type = '[GeneralAddress] Set Municipality';
  constructor(public municipality: Municipality) {}
}

export class UpdateMunicipality {
  static readonly type = '[GeneralAddress] Update Municipality';
  constructor(public municipality: Municipality) {}
}

export class DeleteMunicipality {
  static readonly type = '[GeneralAddress] Delete Municipality';
  constructor(public id: string) {}
}

export class SetStateSelected {
  static readonly type = '[GeneralAddress] Set State Selected';
  constructor(public idState: string) {}
}

@State<AddressModel>({
  name: 'generaladdress',
  defaults: {
    states: [],
    stateSelected: {
      id: '',
      name: '',
      polygon: '',
      createdAt: '',
      updatedAt: '',
    },
    availableMunicipalities: [],
  },
})
export class AddressState implements NgxsOnInit {
  subscriptionService: Subscription;

  @Selector()
  static states(state: AddressModel): Statal[] | null {
    return state.states;
  }

  @Selector()
  static stateSelected(state: AddressModel): Statal | null {
    return state.stateSelected;
  }

  @Selector()
  static municipalities(state: AddressModel): Municipality[] | null {
    return state.availableMunicipalities;
  }

  constructor(private addressService: AddressService) {}

  ngxsOnInit(ctx: StateContext<AddressModel>): void {
    ctx.dispatch(new GetStates());
  }

  @Action(GetStates)
  getStates(ctx: StateContext<AddressModel>, action: GetStates) {
    this.addressService.getStates().subscribe((response) => {
      ctx.setState(
        patch({
          ...ctx.getState(),
          states: response,
        })
      );
    });
  }

  @Action(SetStateSelected)
  SetStateSelected(ctx: StateContext<AddressModel>, action: SetStateSelected) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        stateSelected: ctx
          .getState()
          .states.find((state) => state.id === action.idState),
      })
    );

    this.addressService
      .getMunicipalityByState(action.idState)
      .subscribe((response) => {
        ctx.setState(
          patch({
            ...ctx.getState(),
            availableMunicipalities: response,
          })
        );
      });
  }

  @Action(SetMunicipality)
  setMunicipality(ctx: StateContext<AddressModel>, action: SetMunicipality) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        availableMunicipalities: append([action.municipality]),
      })
    );
  }

  @Action(UpdateMunicipality)
  updateMunicipality(
    ctx: StateContext<AddressModel>,
    action: UpdateMunicipality
  ) {

    ctx.setState(
      patch({
        ...ctx.getState(),
        availableMunicipalities: updateItem<Municipality>(
          (item) => item.id === action.municipality.id,
          action.municipality
        ),
      })
    );
  }

  @Action(DeleteMunicipality)
  deleteMunicipality(
    ctx: StateContext<AddressModel>,
    action: DeleteMunicipality
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        availableMunicipalities: removeItem<Municipality>(
          (item) => item.id === action.id
        ),
      })
    );
  }
}
