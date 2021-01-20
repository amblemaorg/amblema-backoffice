import { UserCreationRequest } from 'src/app/_models/request/user-creation-request.model';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { UserCreationRequestService } from 'src/app/services/request/user-creation-request.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { REQUEST_STATUS } from 'src/app/_helpers/convention/request-status';
import { Inject, Injectable } from '@angular/core';

export interface UserCreationRequestModel {
  userCreationRequests: UserCreationRequest[];
}

export class GetUserCreationRequests {
  static readonly type = '[User Creation Requests] Get UserCreationRequests';
}

export class UpdateUserCreationRequest {
  static readonly type = '[User Creation Request] Update UserCreationRequest';
  constructor(
    public newRequest: UserCreationRequest,
    public oldRequest: UserCreationRequest
  ) {}
}

export class DeleteUserCreationRequest {
  static readonly type = '[User Creation Request] Delete UserCreationRequest';
  constructor(public payload: UserCreationRequest) {}
}

@State<UserCreationRequestModel>({
  name: 'usercreationrequest',
  defaults: {
    userCreationRequests: [],
  },
})
@Injectable()
export class UserCreationRequestState implements NgxsOnInit {
  @Selector()
  static creationRequests(
    state: UserCreationRequestModel
  ): UserCreationRequest[] | null {
    return state.userCreationRequests;
  }

  @Selector()
  static creationRequestsPending(
    state: UserCreationRequestModel
  ): UserCreationRequest[] | null {
    const value: any[] = [];

    state.userCreationRequests.forEach((response) => {
      if (response.status === REQUEST_STATUS.PENDING.CODE) {
        value.push(response);
      }
    });

    return value;
  }

  ngxsOnInit(ctx: StateContext<UserCreationRequestModel>): void {
    ctx.dispatch(new GetUserCreationRequests());
  }

  constructor(private userCreationRequestService: UserCreationRequestService) {}

  @Action(GetUserCreationRequests)
  getUserCreationRequests(ctx: StateContext<UserCreationRequestModel>) {

    this.userCreationRequestService
      .getUserCreationRequests()
      .subscribe((response) => {
        ctx.setState({
          ...ctx.getState(),
          userCreationRequests: response,
        });
      });
  }

  @Action(UpdateUserCreationRequest)
  updateUserCreationRequest(
    ctx: StateContext<UserCreationRequestModel>,
    action: UpdateUserCreationRequest
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        userCreationRequests: updateItem<UserCreationRequest>(
          (userCreationRequests) =>
            userCreationRequests.id === action.oldRequest.id,
          action.newRequest
        ),
      })
    );
  }

  @Action(DeleteUserCreationRequest)
  deleteUserCreationRequest(
    ctx: StateContext<UserCreationRequestModel>,
    action: DeleteUserCreationRequest
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        userCreationRequests: removeItem<UserCreationRequest>(
          (userCreationRequests) =>
            userCreationRequests.id === action.payload.id
        ),
      })
    );
  }
}
