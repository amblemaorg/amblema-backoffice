import { RequestValidateInformation } from 'src/app/models/request/requests-validate-information.model';
import { State, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { InformationValidationRequestService } from 'src/app/services/request/information-validation-request.service';

export interface RequestsValidateInformationModel {
  requestsValidateInformation: RequestValidateInformation[];
  selectedRequestValidateInformation?: any;
}

export class GetRequestValidateInformation {
  static readonly type = '[RequestValidateInformation] Get Request Validate Information';
}

export class UpdateRequestValidateInformation {
  static readonly type =
    '[RequestValidateInformation] Update Request Validate Information';
  constructor(public newData: RequestValidateInformation) {}
}

export class SelectedRequestValidateInformation {
  static readonly type =
    '[selectedRequestValidateInformation] Selected Request Validate Information';
  constructor(public payload: any) {}
}

export class DeleteRequestValidateInformation {
  static readonly type =
    '[RequestValidateInformation] Delete Request Validate Information';
  constructor(public id: string) {}
}

@State<RequestsValidateInformationModel>({
  name: 'requestvalidateinformation', 
  defaults: {
    requestsValidateInformation: [],
  }
})
export class RequestsValidateInformation implements NgxsOnInit {
  
  constructor(
    private requestInformationValidateService: InformationValidationRequestService
  ) {}

  ngxsOnInit(ctx: StateContext<RequestsValidateInformationModel>): void {
    ctx.dispatch(new GetRequestValidateInformation());
  }

  @Action(GetRequestValidateInformation)
  getRequestValidateInformation(ctx: StateContext<RequestsValidateInformationModel>) {
    this.requestStepApprovalService
      .getRequestStepApproval()
      .subscribe((response) => {
        ctx.setState({
          ...ctx.getState(),
          requestsValidateInformation: response,
        });
      });
  }

  // @Action(UpdateRequestStepApproval)
  // UpdateRequestStepApproval(ctx: StateContext<RequestsStepApprovalModel>, action: UpdateRequestStepApproval) {

  //   ctx.setState( patch( {
  //     ...ctx.getState(),
  //     requestsStepsApproval: updateItem<RequestStepApproval>( request => request.id === action.newData.id, action.newData ),
  //     selectedRequest: action.newData
  //   }));

  // }

  // @Action(SelectedRequest)
  // selectedRequest(
  //   ctx: StateContext<RequestsStepApprovalModel>,
  //   action: SelectedRequest
  // ) {
  //   ctx.setState({
  //     ...ctx.getState(),
  //     selectedRequest: action.payload,
  //   });
  // }

  // @Action(DeleteRequestStepApproval)
  // deleteRequestStepApproval(ctx: StateContext<RequestsStepApprovalModel>, action: DeleteRequestStepApproval) {

  //   ctx.setState(patch({
  //     ...ctx.getState(),
  //     requestsStepsApproval: removeItem<RequestStepApproval>( item => item.id === action.id )
  //   }));
  // }
}