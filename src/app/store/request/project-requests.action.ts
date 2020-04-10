import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { ProjectRequestsModule } from 'src/app/pages/request/project-requests/project-requests.module';

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

export class DeleteProjectRequests {
    static readonly type = '[Project] Delete ProjectRequest';
    constructor( public payload: ProjectRequest ) {}
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

    @Action(DeleteProjectRequests)
    deleteProjectRequests( ctx: StateContext<ProjectRequestModel>, action: DeleteProjectRequests ) {
        ctx.setState( patch({
            ...ctx.getState(),
            projectRequests: removeItem<ProjectRequest>(  projectRequest => projectRequest.id === action.payload.id )
        }));

    }

}
