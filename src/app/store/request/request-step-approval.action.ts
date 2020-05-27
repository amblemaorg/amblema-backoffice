import { RequestStepApproval } from 'src/app/models/request/request-step-approval.model';
import { State, Selector, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';

export interface RequestsStepApprovalModel {
  requestsStepsApproval: RequestStepApproval[];
  selectedRequest?: any;
}

export class GetRequestsStepApproval {
  static readonly type = '[RequestStepApproval] Get Request Step Approval';
}

export class UpdateRequestStepApproval {
  static readonly type = '[RequestStepApproval] Update Request Step Approval';
  constructor( public newData: RequestStepApproval ) {}
}

export class SelectedRequest {
  static readonly type = '[selectedRequest] Selected Request';
  constructor(public payload: any) {}
}

export class DeleteRequestStepApproval {
  static readonly type = '[RequestStepApproval] Delete Request Step Approval';
  constructor( public id: string ) {}
}

@State<RequestsStepApprovalModel>({
  name: 'requeststepapproval',
  defaults: {
    requestsStepsApproval: [],
  },
})
export class RequestStepApprovalState implements NgxsOnInit {
  @Selector()
  static requestsStepApproval(
    state: RequestsStepApprovalModel
  ): RequestStepApproval[] | null {
    return state.requestsStepsApproval;
  }

  @Selector()
  static selectedRequest(state: RequestsStepApprovalModel): any | null {
    return state.selectedRequest;
  }

  constructor(private requestStepApprovalService: InformationRequestService) {}

  ngxsOnInit(ctx: StateContext<RequestsStepApprovalModel>): void {
    ctx.dispatch(new GetRequestsStepApproval());
  }

  @Action(GetRequestsStepApproval)
  getRequestsStepApproval(ctx: StateContext<RequestsStepApprovalModel>) {
    this.requestStepApprovalService
      .getRequestStepApproval()
      .subscribe((response) => {
        ctx.setState({
          ...ctx.getState(),
          requestsStepsApproval: response,
        });
      });
  }

  @Action(UpdateRequestStepApproval)
  UpdateRequestStepApproval(ctx: StateContext<RequestsStepApprovalModel>, action: UpdateRequestStepApproval) {

    ctx.setState( patch( {
      ...ctx.getState(),
      requestsStepsApproval: updateItem<RequestStepApproval>( request => request.id === action.newData.id, action.newData ),
      selectedRequest: action.newData
    }));

  }

  @Action(SelectedRequest)
  selectedRequest(
    ctx: StateContext<RequestsStepApprovalModel>,
    action: SelectedRequest
  ) {
    ctx.setState({
      ...ctx.getState(),
      selectedRequest: action.payload,
    });
  }

  @Action(DeleteRequestStepApproval)
  deleteRequestStepApproval(ctx: StateContext<RequestsStepApprovalModel>, action: DeleteRequestStepApproval) {

    ctx.setState(patch({
      ...ctx.getState(),
      requestsStepsApproval: removeItem<RequestStepApproval>( item => item.id === action.id )
    }));

  }
}
