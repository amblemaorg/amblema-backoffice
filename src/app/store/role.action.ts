import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Role } from '../_models/permission.model';
import { NgZone } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { Utility } from '../_helpers/utility';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';

export interface RoleStateModel {
    role: Role;
    roles: Role[];
}

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
    constructor(public newRole: Role, public oldRole: Role) { }
}

export class DeleteRole {
    static readonly type = '[Role] Delete Role';
    constructor(public payload: Role) { }
}

export class SelectedRole {
    static readonly type = '[Role] Selected Role';
    constructor( public payload: Role ) {}
}

// Role State

@State<RoleStateModel>({
    name: 'roles',
    defaults: {
        role: {
            id: '',
            name: '',
            permissions: [],
            status: '',
        },
        roles: []
    }
})
export class RolesState implements NgxsOnInit {

    @Selector()
    static roles(state: RoleStateModel): Role[] | null {
        return state.roles;
    }

    @Selector()
    static role( state: RoleStateModel ): Role | null { return state.role;  }

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

    @Action( SelectedRole )
    selectedRole( ctx: StateContext<RoleStateModel>, action: SelectedRole ) {
        ctx.setState( patch({
            ...ctx.getState(),
            role: action.payload
        }) );
    }

    @Action(GetRoles)
    getRoles(ctx: StateContext<RoleStateModel>) {
        return this.permissionsService.getRoles()
            .subscribe(response => {
                response = this.helper.readlyStatus(response);
                ctx.setState({
                    ...ctx.getState(),
                    roles: response
                }
                );
            });
    }

    @Action(SetRole)
    setRole(ctx: StateContext<RoleStateModel>, action: SetRole) {
        const value: any = this.helper.readlyStatus( [action.payload] )[0];

        ctx.setState(patch({
            ...ctx.getState(),
            roles: append([value])
        }));
    }

    @Action(UpdateRole)
    updateRole(ctx: StateContext<RoleStateModel>, action: UpdateRole) {


        ctx.setState(patch({
            ...ctx.getState(),
            roles: updateItem<Role>(role => role.id === action.oldRole.id, this.helper.readlyStatus([action.newRole])[0])
        }));
    }

    @Action(DeleteRole)
    deleteRole(ctx: StateContext<RoleStateModel>, action: DeleteRole) {
        ctx.setState(patch({
            ...ctx.getState(),
            roles: removeItem<Role>(role => role.id === action.payload.id)
        }));
    }
}
