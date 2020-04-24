
import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { EnvironmentalProject, Lapse } from '../models/environmental-project.model';
import { OnDestroy } from '@angular/core';
import { EnvironmentalProjectService } from '../services/environmental-project.service';
import { Subscription } from 'rxjs';
import { patch } from '@ngxs/store/operators';

export interface EnvironmentalProjectModel extends EnvironmentalProject {
    lapseSelected?: Lapse;
}

// -- Actions --

export class GetEnvironmentalProject {
    static readonly type = '[EnvironmentalProject] Get All EnvironmentalProject';
}

export class SelectLapse {
    static readonly type = '[EnvironmentalProject] Select A EnvironmentalProject';
    constructor(public lapse: string) { }
}

@State<EnvironmentalProjectModel>({
    name: 'environmentalproject',
    defaults: {
        name: '',
        lapse1: {
            generalObjective: '',
            topics: []
        },
        lapse2: {
            generalObjective: '',
            topics: []
        },
        lapse3: {
            generalObjective: '',
            topics: []
        },
        lapseSelected: null
    }
})

export class EnvironmentalProjectState implements NgxsOnInit, OnDestroy {

    subscriptionEnvironmentalProject: Subscription;

    @Selector()
    static environmentalProject(state: EnvironmentalProjectModel): EnvironmentalProjectModel | null {
        return state;
    }

    @Selector()
    static environmentalLapse1(state: EnvironmentalProjectModel): Lapse | null {
        return state.lapse1;
    }

    @Selector()
    static environmentalLapse2(state: EnvironmentalProjectModel): Lapse | null {
        return state.lapse2;
    }

    @Selector()
    static environmentalLapse3(state: EnvironmentalProjectModel): Lapse | null {
        return state.lapse3;
    }

    @Selector()
    static lapseSelected(state: EnvironmentalProjectModel): Lapse | null {
        return state.lapseSelected;
    }

    constructor(
        private environmentalProjectServivce: EnvironmentalProjectService) { }

    ngxsOnInit(ctx: StateContext<EnvironmentalProjectModel>): void {
        ctx.dispatch(new GetEnvironmentalProject());
    }

    ngOnDestroy() {
        if (this.subscriptionEnvironmentalProject) {
            this.subscriptionEnvironmentalProject.unsubscribe();
        }
    }

    @Action(GetEnvironmentalProject)
    getEnvironmentalProject(ctx: StateContext<EnvironmentalProjectModel>, action: GetEnvironmentalProject) {
        this.subscriptionEnvironmentalProject = this.environmentalProjectServivce.getEnvironmentalProject().subscribe(response => {
            ctx.setState(response);
        });
    }

    @Action(SelectLapse)
    selectLapse(ctx: StateContext<EnvironmentalProjectModel>, action: SelectLapse) {
        switch (action.lapse) {
            case '1':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse1
                }));
                break;
            case '2':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse2
                }));
                break;
            case '3':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse3
                }));
                break;
        }
    }
}
