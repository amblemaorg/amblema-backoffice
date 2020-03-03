import { State, NgxsOnInit, Action, StateContext } from '@ngxs/store';
import { AdminUser } from 'src/app/models/user/admin-user.model';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { AdminUserService } from 'src/app/services/user/admin-user.service';

// -- State interface --

export interface AdminUserModel {
    adminUser: AdminUser;
    adminUsers: AdminUser[];
}

// -- Actions Admin User

export class GetAdminUsers {
    static readonly type = '[User] Get Users';
    constructor() { }
}

export class SetAdminUser {
    static readonly type = '[User] Set User';
    constructor(public payload: AdminUser) { }
}

export class UpdateAdminUser {
    static readonly type = '[User] Update User';
    constructor(public oldAdminUser: AdminUser, public newAdminUser: AdminUser) { }
}

export class DeleteAdminUser {
    static readonly type = '[User] Delete User';
    constructor(public payload: AdminUser) { }
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
            function: ''
        },
        adminUsers: []
    }
})
export class AdminUserState implements NgxsOnInit {

    constructor(
        private toastr: CustomToastrService,
        private adminUserService: AdminUserService
    ) {}

    ngxsOnInit(ctx: StateContext<AdminUserModel>) {
        ctx.dispatch(new GetAdminUsers());
    }

    // -- Admin user's actions --

    @Action(GetAdminUsers)
    getAdminUsers(ctx: StateContext<AdminUserModel>) {
        this.adminUserService.getAdminUsers()
            .subscribe(response => {
                if (response) {
                    ctx.setState({
                        ...ctx.getState(),
                        adminUsers: response
                    });
                }
            });
    }

    @Action( SetAdminUser )
    setAdminUser( ctx: StateContext<AdminUser>, payload: SetAdminUser ) {
        
    }
}
