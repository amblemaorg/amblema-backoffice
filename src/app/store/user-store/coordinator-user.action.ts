import { CoordinatorUser } from 'src/app/models/user/coordinator-user.model';
import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { CoordinatorUserService } from 'src/app/services/user/coordinator-user.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { Subscription, SubscriptionLike } from 'rxjs';
import { OnDestroy } from '@angular/core';

export interface CoordinatorUserModel {
    coordinatorUser: CoordinatorUser;
    coordinatorUsers: CoordinatorUser[];
}

// -- Actions --

export class GetCoordinatorUsers {
    static readonly type = '[Coordinator User] Get Coordinator Users';
    constructor() { }
}

export class SetCoordinatorUser {
    static readonly type = '[Coordinator User] Set Coordinator User';
    constructor(public payload: CoordinatorUser) { }
}

export class UpdateCoordinatorUser {
    static readonly type = '[Coordinator User] Update Coordinator User';
    constructor(public oldCoordinatorUser: CoordinatorUser, public newCoordinatorUser: CoordinatorUser) { }
}

export class DeleteCoordinatorUser {
    static readonly type = '[Coordinator User] Delete Coordinator User';
    constructor(public payload: CoordinatorUser) { }
}

export class SelectedCoordinatorUser {
    static readonly type = '[Coordinator User] Selected Coordinator User';
    constructor(public payload: CoordinatorUser) { }
}

@State<CoordinatorUserModel>({
    name: 'coordinatoruser',
    defaults: {
        coordinatorUser: {
            id: '',
            name: '',
            email: '',
            password: '',
            userType: '',
            phone: '',
            role: '',
            addressState: '',
            addressMunicipality: '',
            addressCity: ' ',
            address: '',
            gender: '',
            firstName: '',
            lastName: '',
            cardType: '',
            cardId: '',
            birthdate: '',
            homePhone: '',
            addressHome: '',
            status: ''
        },
        coordinatorUsers: []
    }
})
export class CoordinatorUserState implements NgxsOnInit, OnDestroy {

    subscription: Subscription;

    @Selector()
    static coordinatorUsers(state: CoordinatorUserModel): CoordinatorUser[] | null {
        return state.coordinatorUsers;
    }

    @Selector()
    static coordinatorUser(state: CoordinatorUserModel): CoordinatorUser | null {
        return state.coordinatorUser;
    }

    constructor(
        private helper: Utility,
        private toastr: CustomToastrService,
        private coordinatorUserService: CoordinatorUserService
    ) { }

    ngxsOnInit(ctx: StateContext<CoordinatorUserModel>) {
        ctx.dispatch(new GetCoordinatorUsers());
    }

    ngOnDestroy() : void {
        if( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    @Action(GetCoordinatorUsers)
    getCoordinatorUsers(ctx: StateContext<CoordinatorUserModel>) {
        this.subscription = this.coordinatorUserService.getCoordinatorUsers().subscribe(response => {

            if (response) {
                response = this.helper.readlyTypeDocument(response);
                ctx.setState(patch({
                    ...ctx.getState(),
                    coordinatorUsers: response
                }));
            }

        });
    }

    @Action(SelectedCoordinatorUser)
    selectedCoordinatorUser(ctx: StateContext<CoordinatorUserModel>, action: SelectedCoordinatorUser) {
        ctx.setState(patch({
            ...ctx.getState(),
            coordinatorUser: action.payload
        }));
    }

    @Action(SetCoordinatorUser)
    setCoordinatorUser(ctx: StateContext<CoordinatorUserModel>, action: SetCoordinatorUser) {

        action.payload = this.helper.readlyTypeDocument([action.payload])[0];
        ctx.setState(patch({
            ...ctx.getState(),
            coordinatorUsers: append([action.payload])
        }));
    }

    @Action( UpdateCoordinatorUser )
    updateCoordinatorUser( ctx: StateContext<CoordinatorUserModel>, action: UpdateCoordinatorUser ) {
        ctx.setState( patch({
            ...ctx.getState(),
            coordinatorUsers: updateItem<CoordinatorUser>(
                coordinatorUser =>
                coordinatorUser.id === action.oldCoordinatorUser.id, action.newCoordinatorUser )
        }) );
    }

    @Action(DeleteCoordinatorUser)
    deleteCoordinatorUser(ctx: StateContext<CoordinatorUserModel>, action: DeleteCoordinatorUser) {
        this.subscription = this.coordinatorUserService.deleteCoordinatorUser(action.payload.id).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                coordinatorUsers: removeItem<CoordinatorUser>(coordinatorUser => coordinatorUser.id === action.payload.id)
            }));
            this.toastr.deleteRegister('Eliminación', 'Usuario coordinador eliminado');
        });
    }
}
