import { SponsorUser } from 'src/app/models/user/sponsor-user.model';
import { NgxsOnInit, State, Selector, Action, StateContext } from '@ngxs/store';
import { Utility } from 'src/app/helpers/utility';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { SponsorUserService } from 'src/app/services/user/sponsor-user.service';

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
    constructor(public payload: SponsorUser) { }
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
        private sponsorUserService: SponsorUserService,
        private toastr: CustomToastrService,
    ) {}

    ngxsOnInit(ctx: StateContext<SponsorUserModel>) {
        ctx.dispatch( new GetSponsorUsers() );
    }

    // -- Sponsor user's actions --

    @Action( GetSponsorUsers )
    getSponsorUsers( ctx: StateContext<SponsorUserModel>  ) {
        this.sponsorUserService.getSponsorUsers().subscribe( response => {
            if ( response ) {

                ctx.setState( patch({
                    ...ctx.getState(),
                    sponsorUsers: response
                }));
            }
        });
    }

    @Action( SelectedSponsorUser )
    selectedSponsorUser( ctx: StateContext<SponsorUserModel>, action: SelectedSponsorUser ) {
        ctx.setState( patch({
            ...ctx.getState(),
            sponsorUser: action.payload
        }));
    }

    @Action( SetSponsorUser )
    setSponsorUser( ctx: StateContext<SponsorUserModel>, action: SetSponsorUser ) {
        ctx.setState( patch({
            ...ctx.getState(),
            sponsorUsers: append([action.payload])
        }));
    }

    @Action( UpdateSponsorUser )
    updateSponsorUser( ctx: StateContext<SponsorUserModel>, action: UpdateSponsorUser ) {
        ctx.setState( patch({
            ...ctx.getState(),
            sponsorUsers: updateItem<SponsorUser>(
                sponsorUser =>
                sponsorUser.id === action.oldSponsorUser.id, action.newSponsorUser )
        }));
    }

    @Action( DeleteSponsorUser )
    deleteSponsorUser(ctx: StateContext<SponsorUserModel>, action: DeleteSponsorUser  ) {

        this.sponsorUserService.deleteSponsorUser(action.payload.id).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                sponsorUsers: removeItem<SponsorUser>(sponsorUser => sponsorUser.id === action.payload.id)
            }));
            this.toastr.deleteRegister('Eliminación', 'Usuario padrino eliminado');
        });
    }
}
