import { CoordinatorUser } from 'src/app/_models/user/coordinator-user.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Utility } from 'src/app/_helpers/utility';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { CoordinatorUserService } from 'src/app/services/user/coordinator-user.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

export interface CoordinatorUserModel {
    coordinatorUser: CoordinatorUser;
    coordinatorUsers: CoordinatorUser[];
    coordinatorUsersCompact: CoordinatorUser[];
}

// -- Actions --

export class GetCoordinatorUsers {
    static readonly type = '[Coordinator User] Get Coordinator Users';
    constructor() { }
}

export class GetCoordinatorUsersCompact {
    static readonly type = '[Coordinator User] Get Coordinator Users Compact';
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

// TODO: Add Angular decorator.
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
        coordinatorUsers: [],
        coordinatorUsersCompact: []
    }
})
@Injectable()
@Injectable()
export class CoordinatorUserState implements OnDestroy {

    subscription: Subscription;

    @Selector()
    static coordinatorUsers(state: CoordinatorUserModel): CoordinatorUser[] | null {
        return state.coordinatorUsers;
    }

    @Selector()
    static coordinatorUsersCompact(state: CoordinatorUserModel): CoordinatorUser[] | null {
        return state.coordinatorUsersCompact;
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

    ngOnDestroy(): void {
        if (this.subscription) {
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

    @Action(GetCoordinatorUsersCompact)
    getCoordinatorUsersCompact(ctx: StateContext<CoordinatorUserModel>) {
        this.subscription = this.coordinatorUserService.getCoordinatorUsers('id,firstName,lastName').subscribe(response => {
            if (response) {
                response = this.helper.readlyTypeDocument(response);
                // Map firstName and lastName to name for the selector
                response.map(user => {
                    user.name = `${user.firstName} ${user.lastName}`;
                    return user;
                });
                ctx.setState(patch({
                    ...ctx.getState(),
                    coordinatorUsersCompact: response
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

    @Action(UpdateCoordinatorUser)
    updateCoordinatorUser(ctx: StateContext<CoordinatorUserModel>, action: UpdateCoordinatorUser) {
        ctx.setState(patch({
            ...ctx.getState(),
            coordinatorUsers: updateItem<CoordinatorUser>(
                coordinatorUser =>
                    coordinatorUser.id === action.oldCoordinatorUser.id, action.newCoordinatorUser)
        }));
    }

    @Action(DeleteCoordinatorUser)
    deleteCoordinatorUser(ctx: StateContext<CoordinatorUserModel>, action: DeleteCoordinatorUser) {

        ctx.setState(patch({
            ...ctx.getState(),
            coordinatorUsers: removeItem<CoordinatorUser>(coordinatorUser => coordinatorUser.id === action.payload.id)
        }));
        this.toastr.deleteRegister('Eliminación', 'Usuario coordinador eliminado');
    }
}
