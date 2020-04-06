import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { patch, updateItem } from '@ngxs/store/operators';

export interface ProjectRequestModel {
    projectRequests: ProjectRequest[];
}

export class GetProjectRequests {
    static readonly type = '[GetProjectRequests] Get ProjectRequests';
}

export class UpdateProjectRequests {
    static readonly type = '[Project] Update ProjectRequest';
    constructor(public newProject: ProjectRequest, public oldProject: ProjectRequest) { }
}

@State<ProjectRequestModel>({
    name: 'projectrequest',
    defaults: {
        projectRequests: []
    }
})
export class ProjectRequestState implements NgxsOnInit {

    @Selector()
    static projectRquests(state: ProjectRequestModel): ProjectRequest[] | null {
        return state.projectRequests;
    }

    ngxsOnInit(ctx: StateContext<ProjectRequestModel[]>): void {
        ctx.dispatch(new GetProjectRequests());
    }

    constructor(private projectRequestsService: ProjectRequestsService) { }

    @Action(GetProjectRequests)
    getProjectRequests(ctx: StateContext<ProjectRequestModel>) {
        this.projectRequestsService.getProjectRequests().subscribe(response => {
            ctx.setState({
                ...ctx.getState(),
                projectRequests: response
            });
        });
    }


    @Action(UpdateProjectRequests)
    updateProjectRequests(ctx: StateContext<ProjectRequestModel>, action: UpdateProjectRequests) {
        ctx.setState(patch({
            ...ctx.getState(),
            projectRequests: updateItem<ProjectRequest>(projectRequest => projectRequest.id === action.oldProject.id, action.newProject)
        }));
    }
}
