import { Project } from '../_models/project.model';
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
    constructor( public payload: string ) {}
}

export class ClearProject {
    static readonly type = '[Project] Clear Project';
    constructor( ) {}
}

@State<ProjectStateModel>({
    name: 'projects',
    defaults: {
        project: {
            id: '',
            code: '',
            phase: '',
            coordinator: ' ',
            school: '',
            sponsor: '',
            status: '',
            createdAt: '',
            updatedAt: ''
        },
        projects: []
    }
})
export class ProjectState implements NgxsOnInit, OnDestroy {
    private subscription: Subscription;

    @Selector()
    static project( state: ProjectStateModel ): Project | null {
        return state.project;
    }

    @Selector()
    static projects( state: ProjectStateModel ): Project[] | null {
        return state.projects;
    }

    constructor(
        private toastr: CustomToastrService,
        private projectService: ProjectService ) {

    }

    ngxsOnInit(ctx: StateContext<ProjectStateModel>): void {
        ctx.dispatch(new GetProjects());
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
        });
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
            projects: append([action.payload])
        }));
    }

    @Action(UpdateProject)
    updateProject(ctx: StateContext<ProjectStateModel>, action: UpdateProject) {

        ctx.setState(patch({
            ...ctx.getState(),
            projects: updateItem<Project>(project => project.id === action.oldProject.id, action.newProject)
        }));

    }

    @Action(DeleteProject)
    deleteProject(ctx: StateContext<ProjectStateModel>, action: DeleteProject) {
        this.subscription = this.projectService.deleteProject(action.payload).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                projects: removeItem<Project>(project => project.id === action.payload)
            }));
            this.toastr.deleteRegister('Eliminación', 'Se ha eliminado un proyecto');
        });
    }
}
