import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { ProjectRequest } from 'src/app/models/request/project-requests.model';
import { ProjectRequestsService } from 'src/app/services/request/project-requests.service';
import { patch } from '@ngxs/store/operators';


export class GetProjectRequests {
    static readonly type = "[GetProjectRequests] Get GetProjectRequests";
}

@State< ProjectRequest [] >({
    name: 'projectrequest',
    defaults: []
})
export class ProjectRequestState implements NgxsOnInit {
    
    @Selector()
    static projectRquests( state: ProjectRequest[] ) : ProjectRequest[] | null {
        return state; 
    }

    ngxsOnInit( ctx: StateContext<ProjectRequest[]> ) : void {
        ctx.dispatch( new GetProjectRequests() );
    }

    constructor( private projectRequestsService: ProjectRequestsService) {}

    @Action( GetProjectRequests )
    getProjectRequests( ctx: StateContext< ProjectRequest[]>  ) { 
        this.projectRequestsService.getProjectRequests().subscribe( response => {
            ctx.setState( response ); 
        } );
        
    }
}