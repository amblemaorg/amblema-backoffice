import { RequestStepApproval } from "src/app/models/request/request-step-approval.model";
import { State, Selector, NgxsOnInit, StateContext, Action } from "@ngxs/store";
import { InformationRequestService } from 'src/app/services/request/information-request.service';

export interface RequestsStepApprovalModel {
  requestsStepsApproval: RequestStepApproval[];
}

export class GetRequestsStepApproval {
  static readonly type = "[RequestStepApproval] Get Request Step Approval";
}

@State<RequestsStepApprovalModel>({
  name: "requeststepapproval",
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

  constructor(private requestStepApprovalService: InformationRequestService) {}

  ngxsOnInit( ctx: StateContext<RequestsStepApprovalModel> ) : void {
    ctx.dispatch( new  GetRequestsStepApproval());
  }

  @Action( GetRequestsStepApproval ) 
  getRequestsStepApproval( ctx: StateContext<RequestsStepApprovalModel> ) {
    this.requestStepApprovalService.getRequestStepApproval().subscribe(response => {
        ctx.setState({
            ...ctx.getState(),
            requestsStepsApproval:  response
        });
    });
  }
}
