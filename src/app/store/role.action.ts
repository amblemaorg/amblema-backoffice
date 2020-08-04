import { State, Action, StateContext, Selector, NgxsOnInit } from "@ngxs/store";
import { Role, Permission, ActionRole } from "../_models/permission.model";
import { NgZone } from "@angular/core";
import { PermissionService } from "../services/permission.service";
import { Utility } from "../_helpers/utility";
import { patch, append, updateItem, removeItem } from "@ngxs/store/operators";
import { AuthService } from "../services/user/auth.service";

export interface RoleStateModel {
  role: Role;
  roles: Role[];
  actions?: Permission[];

  // --- actions of the logged in user
  actionsLoggedUser?: any[];
}

/**
 * Get roles
 */

export class GetRoles {
  static readonly type = "[Roles] Get Roles";
}

export class GetRole {
  static readonly type = "[Role] Get Role";
}

export class SetRole {
  static readonly type = "[Role] Set Role";
  constructor(public payload: Role) {}
}

export class UpdateRole {
  static readonly type = "[Role] Update Role";
  constructor(public newRole: Role, public oldRole: Role) {}
}

export class DeleteRole {
  static readonly type = "[Role] Delete Role";
  constructor(public payload: Role) {}
}

export class SelectedRole {
  static readonly type = "[Role] Selected Role";
  constructor(public payload: Role) {}
}

/**
 * Get actions
 */

export class GetActions {
  static readonly type = "[Actions] Get Actions";
}

export class UpdateActions {
  static readonly type = "[Actions] Update Action";
  constructor(public entity: Permission, public action: ActionRole) {}
}

export class SaveActionsLoggedUser {
  static readonly type = `[Actions] Save Actions Logged User`;
  constructor(public actionsLoggedUser: any) {}
}

@State<RoleStateModel>({
  name: "roles",
  defaults: {
    role: {
      id: "",
      name: "",
      permissions: [],
      status: "",
    },
    roles: [],
    actions: [],
    actionsLoggedUser: [],
  },
})
export class RolesState implements NgxsOnInit {
  private static roleStateInstance: RolesState;

  @Selector()
  static roles(state: RoleStateModel): Role[] | null {
    return state.roles;
  }

  @Selector()
  static role(state: RoleStateModel): Role | null {
    return state.role;
  }

  @Selector()
  static actions(state: RoleStateModel): Permission[] | null {
    return state.actions;
  }

  // Get all roles
  ngxsOnInit(ctx: StateContext<Role[]>) {
    ctx.dispatch(new GetRoles());
    ctx.dispatch(new GetActions());

    // -- Save Actions logged User
    ctx.dispatch(new SaveActionsLoggedUser(this.authService.getActionsAdmin()));
  }

  constructor(
    private helper: Utility,
    private ngZone: NgZone,
    private authService: AuthService,
    private permissionsService: PermissionService
  ) {}

  /**
   * Roles actions
   */

  @Action(SelectedRole)
  selectedRole(ctx: StateContext<RoleStateModel>, action: SelectedRole) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        role: action.payload,
      })
    );
  }

  @Action(GetRoles)
  getRoles(ctx: StateContext<RoleStateModel>) {
    return this.permissionsService.getRoles().subscribe((response) => {
      response = this.helper.readlyStatus(response);

      ctx.setState({
        ...ctx.getState(),
        roles: response,
      });
    });
  }

  @Action(SetRole)
  setRole(ctx: StateContext<RoleStateModel>, action: SetRole) {
    const value: any = this.helper.readlyStatus([action.payload])[0];

    ctx.setState(
      patch({
        ...ctx.getState(),
        roles: append([value]),
      })
    );
  }

  @Action(UpdateRole)
  updateRole(ctx: StateContext<RoleStateModel>, action: UpdateRole) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        roles: updateItem<Role>(
          (role) => role.id === action.oldRole.id,
          this.helper.readlyStatus([action.newRole])[0]
        ),
      })
    );
  }

  @Action(DeleteRole)
  deleteRole(ctx: StateContext<RoleStateModel>, action: DeleteRole) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        roles: removeItem<Role>((role) => role.id === action.payload.id),
      })
    );
  }

  /**
   * Actions
   */

  @Action(GetActions)
  getActions(ctx: StateContext<RoleStateModel>) {
    this.permissionsService.getActions().subscribe((response) => {
      ctx.setState(
        patch({
          ...ctx.getState(),
          actions: response,
        })
      );
    });
  }

  @Action(UpdateActions)
  updateActions(ctx: StateContext<RoleStateModel>, action: UpdateActions) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        role: patch({
          ...ctx.getState().role,
          permissions: updateItem<Permission>(
            (permit) => permit.entityId === action.entity.entityId,
            patch({
              ...action.entity,
              actions: updateItem<ActionRole>(
                (actionx) => actionx.name === action.action.name,
                {
                  ...action.action,
                  allowed: !action.action.allowed,
                }
              ),
            })
          ),
        }),
      })
    );
  }

  // ======================================================
  // -- Functions and actions for back office permitting --
  // ======================================================

  @Action(SaveActionsLoggedUser)
  saveActionsLoggedUser(
    ctx: StateContext<RoleStateModel>,
    action: SaveActionsLoggedUser
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        actionsLoggedUser: action.actionsLoggedUser,
      })
    );
  }

  public static getInstance(): RolesState {
    if (this.roleStateInstance === null) {
      this.roleStateInstance = new RolesState(null, null, null, null);
    }
    return this.roleStateInstance;
  } 


  public hello () { console.log('hello world') }
}
