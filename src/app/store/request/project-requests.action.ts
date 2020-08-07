import {
  State,
  NgxsOnInit,
  Action,
  StateContext,
  Selector,
  Select,
} from '@ngxs/store';
import { ProjectRequest } from 'src/app/_models/request/project-request.model';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { REQUEST_STATUS } from 'src/app/_helpers/convention/request-status';
import {
  UserCreationRequestState,
  UserCreationRequestModel,
} from './user-creation-request.action';
import {
  ProjectValidationRequestState,
  ProjectValidationRequestModel,
} from './project-validation-request.action';
import {
  RequestContentState,
  RequestContentModel,
} from './request-content-approval.action';

export interface ProjectRequestModel {
  projectRequests: ProjectRequest[];
}

export class GetProjectRequests {
  static readonly type = '[GetProjectRequests] Get ProjectRequests';
}

export class UpdateProjectRequests {
  static readonly type = '[Project] Update ProjectRequest';
  constructor(
    public newProject: ProjectRequest,
    public oldProject: ProjectRequest
  ) {}
}

export class DeleteProjectRequests {
  static readonly type = '[Project] Delete ProjectRequest';
  constructor(public payload: ProjectRequest) {}
}

@State<ProjectRequestModel>({
  name: 'projectrequest',
  defaults: {
    projectRequests: [],
  },
})
export class ProjectRequestState implements NgxsOnInit {
  @Selector([
    UserCreationRequestState,
    ProjectValidationRequestState,
    RequestContentState,
  ])
  static allRequest(
    state: ProjectRequestModel,
    userCreationRequest: UserCreationRequestModel,
    projectValidationRequest: ProjectValidationRequestModel,
    requestContent: RequestContentModel
 ): any[] {
    const notifications: any = [];

    state.projectRequests.forEach((item) => {
      if (item.status === '1') {
        let element: any = item;
        element = { ...element, notiType: 1 };

        notifications.push(element);
      }
    });

    userCreationRequest.userCreationRequests.forEach((item) => {
      if (item.status === '1') {
        let element: any = item;
        element = { ...element, notiType: 2 };

        notifications.push(element);
      }
    });

    projectValidationRequest.projectValidationRequests.forEach((item) => {
      if (item.status === '1') {
        let element: any = item;
        element = { ...element, notiType: 3 };

        notifications.push(element);
      }
    });

    requestContent.requestsContent.forEach( item => {
        if (item.status === '1') {
            let element: any = item;
            element = { ...element, notiType: 4 };
            notifications.push(element);
          }
    } );


    notifications.sort( ( a: any, b: any ) => {


            if (((new Date(a.createdAt) as any) < new Date(b.createdAt)) as any) {
                return -1 * -1;
            }

            if (((new Date(a.createdAt) as any) > new Date(b.createdAt)) as any) {
                return -1;
            }



     } );

    console.log( notifications );

    return notifications;
  }

  @Selector()
  static projectRquestsPending(
    state: ProjectRequestModel
  ): ProjectRequest[] | null {
    const value: any[] = [];

    state.projectRequests.forEach((response) => {
      if (response.status === REQUEST_STATUS.PENDING.CODE) {
        value.push(response);
      }
    });

    return value;
  }

  @Selector()
  static projectRquests(state: ProjectRequestModel): ProjectRequest[] | null {
    return state.projectRequests;
  }

  ngxsOnInit(ctx: StateContext<ProjectRequestModel[]>): void {
    ctx.dispatch(new GetProjectRequests());
  }

  constructor(private projectRequestsService: ProjectRequestsService) {}

  @Action(GetProjectRequests)
  getProjectRequests(ctx: StateContext<ProjectRequestModel>) {
    this.projectRequestsService.getProjectRequests().subscribe((response) => {
      ctx.setState({
        ...ctx.getState(),
        projectRequests: response,
      });
    });
  }

  @Action(UpdateProjectRequests)
  updateProjectRequests(
    ctx: StateContext<ProjectRequestModel>,
    action: UpdateProjectRequests
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        projectRequests: updateItem<ProjectRequest>(
          (projectRequest) => projectRequest.id === action.oldProject.id,
          action.newProject
        ),
      })
    );
  }

  @Action(DeleteProjectRequests)
  deleteProjectRequests(
    ctx: StateContext<ProjectRequestModel>,
    action: DeleteProjectRequests
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        projectRequests: removeItem<ProjectRequest>(
          (projectRequest) => projectRequest.id === action.payload.id
        ),
      })
    );
  }
}
