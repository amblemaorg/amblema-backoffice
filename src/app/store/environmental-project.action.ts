
import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { EnvironmentalProject, Lapse, Topic, Level } from '../models/environmental-project.model';
import { OnDestroy } from '@angular/core';
import { EnvironmentalProjectService } from '../services/environmental-project.service';
import { Subscription } from 'rxjs';
import { patch, append } from '@ngxs/store/operators';

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

export class AddTopic {
    static readonly type = '[EnvironmentalProject] Add Topic EnvironmentalProject';
    constructor(public topic: Topic) { }
}

export class AddSchoolLevel {
    static readonly type = '[EnvironmentalProject] Add School level EnvironmentalProject';
    constructor(public schoolLevel: Level, public indexTopic: number) { }
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
        lapseSelected: {
            generalObjective: '',
            topics: []
        },
    }
})

export class EnvironmentalProjectState implements NgxsOnInit, OnDestroy {

    subscriptionEnvironmentalProject: Subscription;

    referencingLapse = '1';

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


    @Selector()
    static topics(state: EnvironmentalProjectModel): Topic[] | null {
        return state.lapseSelected.topics;
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
            ctx.setState(patch(response));
        });
    }

    @Action(SelectLapse)
    selectLapse(ctx: StateContext<EnvironmentalProjectModel>, action: SelectLapse) {
        switch (action.lapse) {
            case '1':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse1
                }));
                this.referencingLapse = '1';
                break;
            case '2':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse2
                }));
                this.referencingLapse = '2';
                break;
            case '3':
                ctx.setState(patch({
                    lapseSelected: ctx.getState().lapse3
                }));
                this.referencingLapse = '3';
                break;
        }
    }

    @Action(AddTopic)
    addTopic(ctx: StateContext<EnvironmentalProjectModel>, action: AddTopic) {
        ctx.setState(patch({
            ...ctx.getState(),
            lapseSelected: patch({
                ...ctx.getState().lapseSelected,
                topics: append([action.topic])
            })
        }));

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }

    @Action(AddSchoolLevel)
    addSchoolLevel(ctx: StateContext<EnvironmentalProjectModel>, action: AddSchoolLevel) {
        
        let topic: Array<Topic> = ctx.getState().lapseSelected.topics; 

        topic.forEach( (value, key) => {

            if(key === 0) {
                value.levels.push( action.schoolLevel )   
            }
        } );

        ctx.setState( patch({
            ...ctx.getState(),
            lapseSelected: patch({
                ...ctx.getState().lapseSelected,
                topics: topic
            })
        }) )

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }
    
    // -- Selecting lapse updates one of the three lapses --
    InternalLapseUpdate(ctx?: StateContext<EnvironmentalProjectModel>): void {

        switch (this.referencingLapse) {
            case '1':
                ctx.setState(patch({
                    lapse1: ctx.getState().lapseSelected
                }));
                break;
            case '2':
                ctx.setState(patch({
                    lapse2: ctx.getState().lapseSelected
                }));
                break;
            case '3':
                ctx.setState(patch({
                    lapse3: ctx.getState().lapseSelected
                }));

                break;
        }
    }
}
