import { SponsorUser } from 'src/app/models/user/sponsor-user.model';
import { NgxsOnInit, State, Selector, Action, StateContext } from '@ngxs/store';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { patch, append } from '@ngxs/store/operators';

export interface SponsorUserModel {
    sponsorUser: SponsorUser;
    sponsorUsers: SponsorUser[];
}

// -- Actions --

export class GetSponsorUsers {
    static readonly type = '[Sponsor User] Get Sponsor Users';
    constructor() { }
}

export class SelectedSponsorUser {
    static readonly type = '[Sponsor User] Seledted';
    constructor(public payload: SponsorUser) { }
}

export class SetSponsorUser {
    static readonly type = '[Sponsor User] Set Sponsor User';
    constructor(public payload: SponsorUser) { }
}

export class UpdateSponsorUser {
    static readonly type = '[Sponsor User] Update Sponsor User';
    constructor(public oldSponsorUser: SponsorUser, public newSponsorUser: SponsorUser) { }
}

export class DeleteSponsorUser {
    static readonly type = '[Sponsor User] Delete Sponsor User';
    constructor(public paylaod: SponsorUser) { }
}

@State<SponsorUserModel>({
    name: 'sponsoruser',
    defaults: {
        sponsorUser: {
            id: '',
            name: ' ',
            email: '',
            password: '',
            userType: '',
            phone: '',
            role: ' ',
            addressState: '',
            addressMunicipality: '',
            addressCity: '',
            address: '',
            firstName: '',
            lastName: '',
            cardId: '',
            cardType: '',
            companyRIF: ' ',
            companyType: '',
            companyOtherType: ' ',
            companyPhone: '',
            contactFirstName: '',
            contactLastName: ' ',
            contactPhone: '',
            image: '',
            webSite: '',
            status: ' '
        },
        sponsorUsers: []
    }
})
export class SponsorUserState implements NgxsOnInit {

    @Selector()
    static sponsorUsers( state: SponsorUserModel ): SponsorUser [] | null {
        return state.sponsorUsers;
    }

    @Selector()
    static sponsorUser( state: SponsorUserModel ): SponsorUser | null {
        return state.sponsorUser;
    }

    constructor(
        private helper: Utility,
        private toastr: CustomToastrService,
    ) {}

    ngxsOnInit() { }

    // -- Sponsor user's actions --

    @Action( GetSponsorUsers )
    getSponsorUsers( ctx: StateContext<SponsorUserModel>  ) {

        // CALL SERVICES GET ALL SPONSOR USERS

    }

    @Action( SelectedSponsorUser )
    selectedSponsorUser( ctx: StateContext<SponsorUserModel>, action: SelectedSponsorUser ) {
        ctx.setState( patch({
            ...ctx.getState(),
            sponsorUser: action.payload
        }));
    }

    @Action( SetSponsorUser )
    setAdminUser( ctx: StateContext<SponsorUserModel>, action: SetSponsorUser ) {

        action.payload = this.helper.readlyTypeDocument( [action.payload] )[0];
        ctx.setState( patch({
            ...ctx.getState(),
            adminUsers: append([action.payload])
        }));
    }

    @Action( UpdateSponsorUser )
    updateSponsorUser( ctx: StateContext<SponsorUserModel>, action: UpdateSponsorUser ) {
        console.log('Se estan enviando los datos');
        console.log( action );
    }

    @Action( DeleteSponsorUser )
    deleteSponsorUser(ctx: StateContext<SponsorUserModel>, action: DeleteSponsorUser  ) {

        // CALL SERVICES DELETE

        // this.adminUserService.deleteAdminUser( action.payload.id ).subscribe( response => {
        //     ctx.setState( patch({
        //         ...ctx.getState(),
        //         adminUsers: removeItem<AdminUser>( adminUser => adminUser.id === action.payload.id )
        //     }) );
        //     this.toastr.deleteRegister('Eliminación', 'Usuario administrador eliminado');
        // } );
    }
}
