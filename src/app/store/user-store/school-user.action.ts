import { SchoolUser } from 'src/app/models/user/school.model';
import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { SchoolUserService } from 'src/app/services/user/school-user.service';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export interface SchoolUserModel {
    schoolUser: SchoolUser;
    schoolUsers: SchoolUser[];
}

// -- Actions --

export class GetSchoolUsers {
    static readonly type = '[School User] Get School Users';
    constructor() { }
}

export class SetSchoolUser {
    static readonly type = '[School User] Set School User';
    constructor(public payload: SchoolUser) { }
}

export class UpdateSchoolUser {
    static readonly type = '[School User] Update School User';
    constructor(public oldSchoolUser: SchoolUser, public newSchoolUser: SchoolUser) { }
}

export class DeleteSchoolUser {
    static readonly type = '[School User] Delete School User';
    constructor(public payload: SchoolUser) { }
}

export class SelectedSchoolUser {
    static readonly type = '[School User] Selected School User';
    constructor(public payload: SchoolUser) { }
}

@State<SchoolUserModel>({
    name: 'schooluser',
    defaults: {
        schoolUser: {
            id: '',
            name: '',
            email: '',
            password: '',
            userType: '',
            phone: '',
            role: '',
            addressState: '',
            addressMunicipality: '',
            address: '',
            addressCity: '',
            code: '',

            // Principal
            principalFirstName: '',
            principalLastName: '',
            principalEmail: '',
            principalPhone: '',

            // Sub principal
            subPrincipalFirstName: '',
            subPrincipalLastName: '',
            subPrincipalEmail: '',
            subPrincipalPhone: '',

            // Data school
            image: '',
            schoolType: '',
            nTeachers: 0,
            nAdministrativeStaff: 0,
            nLaborStaff: 0,
            nStudents: 0,
            nGrades: 0,
            nSections: 0,
            schoolShift: '',

            status: '',
        },
        schoolUsers: []
    }
})
export class SchoolUserState implements NgxsOnInit, OnDestroy {

    subscription: Subscription;

    @Selector()
    static schoolUsers(state: SchoolUserModel): SchoolUser[] | null {
        return state.schoolUsers;
    }

    @Selector()
    static schoolUser(state: SchoolUserModel): SchoolUser | null {
        return state.schoolUser;
    }

    constructor(
        private helper: Utility,
        private toastr: CustomToastrService,
        private schoolUserService: SchoolUserService,
    ) { }

    ngxsOnInit(ctx: StateContext<SchoolUserModel>) {
        ctx.dispatch(new GetSchoolUsers());
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    @Action(GetSchoolUsers)
    getSchoolUsers(ctx: StateContext<SchoolUserModel>) {
        this.subscription = this.schoolUserService.getSchoolUsers().subscribe(response => {

            if (response) {
                ctx.setState(patch({
                    ...ctx.getState(),
                    schoolUsers: response
                }));
            }
        });
    }

    @Action(SelectedSchoolUser)
    selectedSchoolUser(ctx: StateContext<SchoolUserModel>, action: SelectedSchoolUser) {
        ctx.setState(patch({
            ...ctx.getState(),
            schoolUser: action.payload
        }));
    }

    @Action(SetSchoolUser)
    setSchoolUser(ctx: StateContext<SchoolUserModel>, action: SetSchoolUser) {

        action.payload = this.helper.readlyTypeDocument([action.payload])[0];
        ctx.setState(patch({
            ...ctx.getState(),
            schoolUsers: append([action.payload])
        }));
    }

    @Action(UpdateSchoolUser)
    updateSchoolUser(ctx: StateContext<SchoolUserModel>, action: UpdateSchoolUser) {
        ctx.setState(patch({
            ...ctx.getState(),
            schoolUsers: updateItem<SchoolUser>(
                schoolUser =>
                    schoolUser.id === action.oldSchoolUser.id, action.newSchoolUser)
        }));
    }

    @Action(DeleteSchoolUser)
    deleteSchoolUser(ctx: StateContext<SchoolUserModel>, action: DeleteSchoolUser) {

        this.subscription = this.schoolUserService.deleteSchoolUser(action.payload.id).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                schoolUsers: removeItem<SchoolUser>(schoolUser => schoolUser.id === action.payload.id)
            }));
            this.toastr.deleteRegister('Eliminación', 'Usuario escuela eliminado');
        });
    }
}
