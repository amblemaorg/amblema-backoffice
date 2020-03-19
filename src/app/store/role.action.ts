import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Role } from '../models/permission.model';
import { NgZone } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { Utility } from '../helpers/utility';

/*
 * NOTA: IMPORTANTE REFACTORIZAR ESTE CODIGO
 * UN SOLO STATE MODEL,  "RolesStateModel"
 */

// Role actions

export class GetRoles {
    static readonly type = '[Roles] Get Roles';
}

export class GetRole {
    static readonly type = '[Role] Get Role';
}

export class SetRole {
    static readonly type = '[Role] Set Role';
    constructor(public payload: Role) { }
}

export class UpdateRole {
    static readonly type = '[Role] Update Role';
    constructor(public payload: Role) { }
}

// Role State

@State<Role[]>({
    name: 'roles',
    defaults: []
})
export class RolesState implements NgxsOnInit {

    @Selector()
    static roles(state: Role[]): Role[] | null {
        return state;
    }

    // Get all roles
    ngxsOnInit(ctx: StateContext<Role[]>) {
        ctx.dispatch(new GetRoles());
    }

    constructor(
        private helper: Utility,
        private ngZone: NgZone,
        private permissionsService: PermissionService,
    ) { }

    /**
     * Roles actions
     */

    @Action(GetRoles)
    getRoles(ctx: StateContext<Role[]>) {
        return this.permissionsService.getRoles()
            .subscribe(response => {
                response = this.helper.readlyStatus(response);
                ctx.setState(response);
            });
    }

    @Action(SetRole)
    setRoles(ctx: StateContext<Role[]>, action: SetRole) {
        const value = ctx.getState();
        ctx.setState(value.concat(this.helper.readlyStatus([action.payload])));
    }

    @Action(UpdateRole)
    updateRoles(ctx: StateContext<Role[]>, action: UpdateRole) {
    }
}

/** Single rol */

@State<Role>({
    name: 'role',
    defaults: {
        id: '',
        name: '',
        permissions: []
    }
})
export class RoleState {

    @Selector()
    static role(state: Role): Role | null {
        return state;
    }

    @Action(UpdateRole)
    updateRole(ctx: StateContext<Role>, action: UpdateRole) {
        ctx.setState(action.payload);
    }
}
