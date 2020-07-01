import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { Statal, Municipality } from 'src/app/_models/address.model';
import { AddressService } from 'src/app/services/address.service';
import { Subscription } from 'rxjs';
import { patch } from '@ngxs/store/operators';

/**
 * New name added to states, this is to avoid confusion with the NGXS library
 */

export class AddressModel {
  states?: Statal[];
  stateSelected?: Statal;
  availableMunicipalities?: Municipality[];
}

export class GetStates {
  static readonly type = '[States] Get States';
}

export class GetMunicipalities {
  static readonly type = '[States] Get Municipalities';
}

export class SetStateSelected {
  static readonly type = '[States] Set State Selected';
  constructor(public idState: string) {}
}

@State<AddressModel>({
  name: 'address',
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
  static states(ctx: StateContext<AddressModel>): Statal[] | null {
    return ctx.getState().states;
  }

  @Selector()
  static stateSelected(ctx: StateContext<AddressModel>): Statal | null {
    return ctx.getState().stateSelected;
  }

  @Selector()
  static municipalities(
    ctx: StateContext<AddressModel>
  ): Municipality[] | null {
    return ctx.getState().availableMunicipalities;
  }

  constructor(private addressService: AddressService) {}

  ngxsOnInit(): void {}

  @Action(GetStates)
  getStates(ctx: StateContext<AddressModel>, action: GetStates) {
    this.subscriptionService = this.addressService
      .getStates()
      .subscribe((response) => {
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

    this.subscriptionService = this.addressService
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
}
