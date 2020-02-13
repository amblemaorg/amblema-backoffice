import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Role } from '../models/permission.model';
import { NgZone } from '@angular/core';
import { PermissionService } from '../services/permission.service';

/**
 * Define Roles actions
 */

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

/**
 * State storage
 */

@State<Role[]>({
    name: 'role',
    defaults: []
})
export class RolesState implements NgxsOnInit {

    @Selector()
    static roles(state: Role[]): Role[] | null {
        return state;
    }

    @Selector()
    static role(id: string, ctx?: StateContext<Role[]>) {
        const roles = ctx.getState();
        roles.filter( value => value.id.indexOf(id) );
    }

    // Get all roles
    ngxsOnInit(ctx: StateContext<Role[]>) {
        ctx.dispatch(new GetRoles());
    }

    constructor(
        private ngZone: NgZone,
        private permissionsService: PermissionService,
    ) {}

    /**
     * Roles actions
     */

    @Action(GetRoles)
    getRoles(ctx: StateContext<Role[]>) {

        return this.permissionsService.getRoles()
            .subscribe(response => {
                ctx.setState(response);
            });
    }

    @Action(SetRole)
    setRoles(ctx: StateContext<Role[]>, action: SetRole) {
        const value = ctx.getState();
        ctx.setState(value.concat(action.payload));
    }

    
}
