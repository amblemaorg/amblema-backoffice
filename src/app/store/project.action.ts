import { Project } from '../models/project.model';
import { State, NgxsOnInit, Selector, StateContext, Action } from '@ngxs/store';
import { ProjectService } from '../services/project.service';
import { CustomToastrService } from '../services/helper/custom-toastr.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

interface ProjectStateModel {
    project: Project;
    projects: Project[];
}

// -- Actions --

export class GetProjects {
    static readonly type = '[Projects] Get Projects';
}

export class SelectedProject {
    static readonly type = '[Project] Selected Project';
    constructor( public payload: Project ) {}
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
export class ProjectState implements NgxsOnInit, OnDestroy {

    @Selector()
    static project( state: ProjectStateModel ): Project | null {
        return state.project;
    }

    @Selector()
    static projects( state: ProjectStateModel ): Project[] | null {
        return state.projects;
    }

    constructor(
        private subscription: Subscription,
        private toastr: CustomToastrService,
        private projectService: ProjectService ) {

    }

    ngxsOnInit(ctx: StateContext<ProjectStateModel>): void {
        ctx.dispatch(new GetProjects);
    }

    ngOnDestroy(): void {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    @Action( GetProjects )
    getProjects(ctx: StateContext<ProjectStateModel>) {
        this.subscription = this.projectService.getProjects().subscribe( response => {
            ctx.setState( patch({
                ...ctx.getState(),
                projects: response
            }));
        } );
    }

    @Action(SelectedProject)
    selectedProject(ctx: StateContext<ProjectStateModel>, action: SelectedProject) {
        ctx.setState(patch({
            ...ctx.getState(),
            project: action.payload
        }));
    }

    @Action(AddProject)
    setProject(ctx: StateContext<ProjectStateModel>, action: AddProject) {

        ctx.setState(patch({
            ...ctx.getState(),
            Projects: append([action.payload])
        }));
    }

    @Action(UpdateProject)
    updateProject(ctx: StateContext<ProjectStateModel>, action: UpdateProject) {

        ctx.setState(patch({
            ...ctx.getState(),
            Projects: updateItem<Project>(Project => Project.id === action.oldProject.id, action.newProject)
        }));

    }

    @Action(DeleteProject)
    deleteProject(ctx: StateContext<ProjectStateModel>, action: DeleteProject) {
        this.subscription = this.projectService.deleteProject(action.payload.id).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                Projects: removeItem<Project>(Project => Project.id === action.payload.id)
            }));
            this.toastr.deleteRegister('Eliminación', 'Se ha eliminado un proyecto');
        });
    }    
}
