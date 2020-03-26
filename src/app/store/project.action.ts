import { Project } from "../models/project.model";
import { State, NgxsOnInit, Selector } from '@ngxs/store';
import { ProjectService } from '../services/project.service';
import { CustomToastrService } from '../services/helper/custom-toastr.service';

interface ProjectStateModel {
    project: Project; 
    projects: Project[];
}

// -- Actions --

export class GetProjects {
    static readonly type = '[Projects] Get Projects';
}

export class AddProject {
    static readonly type = '[Project] Add Project';
    constructor( public payload: Project ) {}
}

export class UpdateProject {
    static readonly type = '[Project] Update Project';
    constructor( public newProject: Project, public oldProject: Project ) {  }
}

export class DeleteProject {
    static readonly type = '[Project] Delete Project';
    constructor( public payload: Project ) {}
}

@State<ProjectStateModel>({
    name: 'projects',
    defaults: {
        project: {
            id: '', 
            title: '',
            phase: '',
            coordinator: ' ',
            school: '', 
            sponsor: ''
        },
        projects: []
    }
})
export class ProjectState implements NgxsOnInit {

    @Selector()
    static project( state: ProjectStateModel ) : Project | null {
        return state.project;
    }

    @Selector()
    static projects( state: ProjectStateModel ) : Project[] | null {
        return state.projects;
    }

    constructor( 
        private toastr: CustomToastrService,
        private projectService: ProjectService ) {
        
    }

    ngxsOnInit() : void {

    }


}