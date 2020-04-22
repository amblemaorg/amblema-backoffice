import { UserCreationRequest } from 'src/app/models/request/user-creation-request.model';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { UserCreationRequestService } from 'src/app/services/request/user-creation-request.service';

export interface UserCreationRequestModel {
    userCreationRequests: UserCreationRequest[];
}

export class GetUserCreationRequests {
    static readonly type = '[User Creation Requests] Get User Creation Requests';
}


@State<UserCreationRequestModel>({
    name: 'usercreationrequest',
    defaults: {
        userCreationRequests: []
    }
})
export class UserCreationRequestState implements NgxsOnInit {

    @Selector()
    static creationRequests( state: UserCreationRequestModel ): UserCreationRequest[] | null {
        return state.userCreationRequests;
    }

    ngxsOnInit(ctx: StateContext<UserCreationRequestModel>): void {
        ctx.dispatch( new GetUserCreationRequests() );
    }

    constructor( private userCreationRequestService: UserCreationRequestService ) {}


    @Action( GetUserCreationRequests )
    getUserCreationRequests(ctx: StateContext<UserCreationRequestModel>) {

        this.userCreationRequestService.getUserCreationRequests().subscribe( response => {
            ctx.setState({
                userCreationRequests: response
            });
        } );
    }

}
