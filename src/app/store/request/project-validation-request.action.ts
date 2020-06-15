import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { ProjectValidationRequest } from 'src/app/models/request/project-validate-request.model';
import { ProjectValidationRequestService } from 'src/app/services/request/project-validate-request.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { REQUEST_STATUS } from 'src/app/helpers/convention/request-status';

export interface ProjectValidationRequestModel {
  projectValidationRequests: ProjectValidationRequest[];
  selectedProjectValidateRequest?: any;
}

export class GetProjectValidationRequest {
  static readonly type =
    '[ProjectValidationRequest] Get Project Validation Request';
}

export class UpdateProjectValidationRequest {
  static readonly type =
    '[ProjectValidationRequest] Update Project Validation Request';
  constructor(public newData: ProjectValidationRequest) {}
}

export class SelectedProjectValidationRequestn {
  static readonly type =
    '[ProjectValidationRequest] Selected Project Validation Request';
  constructor(public payload: any) {}
}

export class DeleteProjectValidationRequest {
  static readonly type =
    '[RequestValidateInformation] Delete Project Validation Request';
  constructor(public id: string) {}
}

@State<ProjectValidationRequestModel>({
  name: 'projectvalidaterequest',
  defaults: {
    projectValidationRequests: [],
  },
})
export class ProjectValidationRequestState implements NgxsOnInit {
  @Selector()
  static projectValidationRequest(
    state: ProjectValidationRequestModel
  ): ProjectValidationRequest[] | null {
    return state.projectValidationRequests;
  }

  @Selector()
  static projectValidationRequestPending(
    state: ProjectValidationRequestModel
  ): ProjectValidationRequest[] | null {
    const value: any[] = [];

    state.projectValidationRequests.forEach((response) => {
      if (response.status === REQUEST_STATUS.PENDING.CODE) {
        value.push(response);
      }
    });

    return value;

  }

  @Selector()
  static selectedProjectValidateRequest(state: ProjectValidationRequestModel): any | null {
    return state.selectedProjectValidateRequest;
  }

  constructor(
    private requestInformationValidateService: ProjectValidationRequestService
  ) {}

  ngxsOnInit(ctx: StateContext<ProjectValidationRequestModel>): void {
    ctx.dispatch(new GetProjectValidationRequest());
  }

  @Action(GetProjectValidationRequest)
  getRequestValidateInformation(
    ctx: StateContext<ProjectValidationRequestModel>
  ) {
    this.requestInformationValidateService
      .getRequestsProjectApproval()
      .subscribe((response) => {
        ctx.setState({
          ...ctx.getState(),
          projectValidationRequests: response,
        });
      });
  }

  @Action(UpdateProjectValidationRequest)
  updateProjectValidationRequest(
    ctx: StateContext<ProjectValidationRequestModel>,
    action: UpdateProjectValidationRequest
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        projectValidationRequests: updateItem<ProjectValidationRequest>(
          (request) => request.id === action.newData.id,
          action.newData
        ),
        selectedProjectValidateRequest: action.newData,
      })
    );
  }

  @Action(SelectedProjectValidationRequestn)
  selectedProjectValidationRequestn(
    ctx: StateContext<ProjectValidationRequestModel>,
    action: SelectedProjectValidationRequestn
  ) {
    ctx.setState({
      ...ctx.getState(),
      selectedProjectValidateRequest: action.payload,
    });
  }

   @Action(DeleteProjectValidationRequest)
   deleteProjectValidationRequest(ctx: StateContext<ProjectValidationRequestModel>, action: DeleteProjectValidationRequest) {
     ctx.setState(patch({
       ...ctx.getState(),
       projectValidationRequests: removeItem<ProjectValidationRequest>( item => item.id === action.id )
     }));
   }
}
