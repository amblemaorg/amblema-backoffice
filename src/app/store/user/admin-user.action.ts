import { State, NgxsOnInit, Action, StateContext, Selector, NgxsAfterBootstrap } from '@ngxs/store';
import { AdminUser } from 'src/app/_models/user/admin-user.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { AdminUserService } from 'src/app/services/user/admin-user.service';
import { Utility } from 'src/app/_helpers/utility';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { NgxsBootstrapper } from '@ngxs/store/internals';

// -- State interface --

export interface AdminUserModel {
  adminUser: AdminUser; // <-- Admin User selected
  adminUsers: AdminUser[];
}

// -- Actions Admin User

export class GetAdminUsers {
  static readonly type = '[User] Get User';
  constructor() {}
}

export class SelectedAdminUser {
  static readonly type = '[User] Selected User';
  constructor(public paylaod: AdminUser) {}
}

export class SetAdminUser {
  static readonly type = '[User] Set User';
  constructor(public payload: AdminUser) {}
}

export class UpdateAdminUser {
  static readonly type = '[User] Update User';
  constructor(public newAdminUser: AdminUser) {}
}

export class DeleteAdminUser {
  static readonly type = '[User] Delete User';
  constructor(public payload: AdminUser) {}
}

@State<AdminUserModel>({
  name: 'adminuser',
  defaults: {
    adminUser: {
      id: '',
      name: '',
      email: '',
      password: '',
      userType: '',
      phone: '',
      role: '',
      addressState: '',
      addressMunicipality: ' ',
      addressCity: '',
      address: ' ',
      firstName: '',
      lastName: '',
      cardType: '',
      cardId: '',
      function: '',
    },
    adminUsers: [],
  },
})
export class AdminUserState implements NgxsOnInit, OnDestroy {
  subscription: Subscription;

  @Selector()
  static adminUsers(state: AdminUserModel): AdminUser[] | null {
    return state.adminUsers;
  }

  @Selector()
  static adminUser(state: AdminUserModel): AdminUser | null {
    return state.adminUser;
  }

  constructor(
    private helper: Utility,
    private toastr: CustomToastrService,
    private adminUserService: AdminUserService
  ) {}



  ngxsOnInit(ctx: StateContext<AdminUserModel>) {
    ctx.dispatch(new GetAdminUsers());
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- Admin user's actions --

  @Action(GetAdminUsers)
  getAdminUsers(ctx: StateContext<AdminUserModel>) {
    this.subscription = this.adminUserService
      .getAdminUsers()
      .subscribe((response) => {
        if (response) {
          response = this.helper.readlyTypeDocument(response);

          ctx.setState({
            ...ctx.getState(),
            adminUsers: response,
          });
        }
      });
  }

  @Action(SelectedAdminUser)
  selectedAdminUser(
    ctx: StateContext<AdminUserModel>,
    action: SelectedAdminUser
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        adminUser: action.paylaod,
      })
    );
  }

  @Action(SetAdminUser)
  setAdminUser(ctx: StateContext<AdminUserModel>, action: SetAdminUser) {
    action.payload = this.helper.readlyTypeDocument([action.payload])[0];
    ctx.setState(
      patch({
        ...ctx.getState(),
        adminUsers: append([action.payload]),
      })
    );
  }

  @Action(UpdateAdminUser)
  updateAdminUser(ctx: StateContext<AdminUserModel>, action: UpdateAdminUser) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        adminUsers: updateItem<AdminUser>(
          (item) => item.id === action.newAdminUser.id,
          action.newAdminUser
        ),
      })
    );

  }

  @Action(DeleteAdminUser)
  deleteAdminUser(ctx: StateContext<AdminUserModel>, action: DeleteAdminUser) {
    this.subscription = this.adminUserService
      .deleteAdminUser(action.payload.id)
      .subscribe((response) => {
        ctx.setState(
          patch({
            ...ctx.getState(),
            adminUsers: removeItem<AdminUser>(
              (adminUser) => adminUser.id === action.payload.id
            ),
          })
        );
        this.toastr.deleteRegister(
          'Eliminación',
          'Usuario administrador eliminado'
        );
      });
  }
}
