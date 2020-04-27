import {
    State,
    NgxsOnInit,
    StateContext,
    Action,
    Selector,
    actionMatcher,
    StateOperator,
} from '@ngxs/store';
import {
    EnvironmentalProject,
    Lapse,
    Topic,
    Level,
} from '../models/environmental-project.model';
import { OnDestroy } from '@angular/core';
import { EnvironmentalProjectService } from '../services/environmental-project.service';
import { Subscription, Observable } from 'rxjs';
import {
    patch,
    append,
    insertItem,
    updateItem,
    compose,
    iif,
    removeItem,
} from '@ngxs/store/operators';

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
    static readonly type =
        '[EnvironmentalProject] Add Topic EnvironmentalProject';
    constructor(public topic: Topic) { }
}

export class AddSchoolLevel {
    static readonly type =
        '[EnvironmentalProject] Add School level EnvironmentalProject';
    constructor(public schoolLevel: Level, public indexTopic: number) { }
}

export class SetNameEnvironmentalProject {
    static readonly type = '[EnvironmentalProject] Set Name EnvironmentalProject';
    constructor( public name: string ) {}
}

export class SetGeneralObjective {
    static readonly type = '[EnvironmentalProject] Set General Objective EnvironmentalProject';
    constructor( public generalObjective: string ) {}
}

export class DeleteTopic {
    static readonly type = '[EnvironmentalProject] Delete Topic EnvironmentalProject';
    constructor( public indexTopic: number ) {}
}

export class UpdateTopic {
    static readonly type = '[EnvironmentalProject] Update Topic EnvironmentalProject';
    constructor( public topic: Topic, public indexTopic: number ) {}
}

export class DeleteSchoolLevel {
    static readonly type = '[EnvironmentalProject] Delete School Level EnvironmentalProject';
}

@State<EnvironmentalProjectModel>({
    name: 'environmentalproject',
    defaults: {
        name: '',
        lapse1: {
            generalObjective: '',
            topics: [],
        },
        lapse2: {
            generalObjective: '',
            topics: [],
        },
        lapse3: {
            generalObjective: '',
            topics: [],
        },
        lapseSelected: {
            generalObjective: '',
            topics: [],
        },
    },
})
export class EnvironmentalProjectState implements NgxsOnInit, OnDestroy {
    subscriptionEnvironmentalProject: Subscription;

    referencingLapse = '1';

    @Selector()
    static environmentalProjectStorable( state: EnvironmentalProjectModel ): EnvironmentalProjectModel | null {
        return {
            name: state.name,
            lapse1: state.lapse1,
            lapse2: state.lapse2,
            lapse3: state.lapse3,
        };
    }

    @Selector()
    static environmentalProject(
        state: EnvironmentalProjectModel
    ): EnvironmentalProjectModel | null {
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
        private environmentalProjectServivce: EnvironmentalProjectService
    ) { }

    ngxsOnInit(ctx: StateContext<EnvironmentalProjectModel>): void {
        ctx.dispatch(new GetEnvironmentalProject());
    }

    ngOnDestroy() {
        if (this.subscriptionEnvironmentalProject) {
            this.subscriptionEnvironmentalProject.unsubscribe();
        }
    }

    @Action(GetEnvironmentalProject)
    getEnvironmentalProject(
        ctx: StateContext<EnvironmentalProjectModel>,
        action: GetEnvironmentalProject
    ) {
        this.subscriptionEnvironmentalProject = this.environmentalProjectServivce
            .getEnvironmentalProject()
            .subscribe((response) => {
                if ( JSON.stringify( response ) !== '{}' ) { // <-- Is not empty
                    ctx.setState(patch(response));
                }
            });
    }

    @Action(SelectLapse)
    selectLapse(
        ctx: StateContext<EnvironmentalProjectModel>,
        action: SelectLapse
    ) {
        switch (action.lapse) {
            case '1':
                ctx.setState(
                    patch({
                        lapseSelected: ctx.getState().lapse1,
                    })
                );
                this.referencingLapse = '1';
                break;
            case '2':
                ctx.setState(
                    patch({
                        lapseSelected: ctx.getState().lapse2,
                    })
                );
                this.referencingLapse = '2';
                break;
            case '3':
                ctx.setState(
                    patch({
                        lapseSelected: ctx.getState().lapse3,
                    })
                );
                this.referencingLapse = '3';
                break;
        }
    }

    /**
     * Topic's actions
     */

    @Action(AddTopic)
    addTopic(ctx: StateContext<EnvironmentalProjectModel>, action: AddTopic) {
        ctx.setState(
            patch({
                ...ctx.getState(),
                lapseSelected: patch({
                    ...ctx.getState().lapseSelected,
                    topics: append([action.topic]),
                }),
            })
        );

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }

    @Action( DeleteTopic )
    deleteTopic(ctx: StateContext<EnvironmentalProjectModel>, action: DeleteTopic ) {

        let topicMatch: Topic;
        let match = false;

        ctx.setState(
            patch({
                ...ctx.getState(),
                lapseSelected: patch({
                    ...ctx.getState().lapseSelected,
                    topics: iif<Topic[]>( (topics) => {
                        topics.forEach((value, key) => {
                            if (key === action.indexTopic) { // <-- Match index topic
                                topicMatch = value; // <-- Save topic to match update
                                match = true;
                            }
                        });

                        return match;

                    }, removeItem<Topic>( topic => topic === topicMatch ))
                }),
            })
        );

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }

    @Action( UpdateTopic )
    updateTopic(ctx: StateContext<EnvironmentalProjectModel>, action: UpdateTopic) {
        let topicMatch: Topic;
        let match = false;

        ctx.setState(
            patch({
                ...ctx.getState(),
                lapseSelected: patch({
                    ...ctx.getState().lapseSelected,
                    topics: iif<Topic[]>( (topics) => {
                        topics.forEach((value, key) => {
                            if (key === action.indexTopic) { // <-- Match index topic
                                topicMatch = value; // <-- Save topic to match update
                                match = true;
                            }
                        });

                        return match;

                    }, updateItem<Topic>( topic => topic === topicMatch, {
                        ...topicMatch,
                        name: action.topic.name,
                        objectives: action.topic.objectives,
                        strategies: action.topic.strategies,
                        contents: action.topic.contents
                    } ))
                }),
            })
        );

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }

    /**
     * Level's actions
     */

    @Action(AddSchoolLevel)
    addSchoolLevel(
        ctx: StateContext<EnvironmentalProjectModel>,
        action: AddSchoolLevel
    ) {
        let topicMatch: Topic;
        let match = false;

        ctx.setState(
            patch({
                ...ctx.getState(),
                lapseSelected: patch({
                    ...ctx.getState().lapseSelected,
                    topics: iif<Topic[]>(  // <-- Conditional match
                        (topics) => {
                            topics.forEach((value, key) => {
                                if (key === action.indexTopic) { // <-- Match index topic
                                    topicMatch = value; // <-- Save topic to match update
                                    match = true;
                                }
                            });
                            return match;
                        },
                        updateItem<Topic>(
                            (topic) => topic === topicMatch, // <-- Match the update by topic
                            patch({
                                ...topicMatch,
                                levels: append([action.schoolLevel]), // <-- Add level according to corresponding topic
                            })
                        )
                    ),
                }),
            })
        );

        this.InternalLapseUpdate(ctx); // <-- Update lapse
    }

    /**
     * Set name environmental project
     */

    @Action( SetNameEnvironmentalProject )
    setNameEnvironmentalProject(ctx: StateContext<EnvironmentalProjectModel>, action: SetNameEnvironmentalProject) {
        ctx.setState( patch({
            ...ctx.getState(),
            name: action.name
        }) );
    }

    /**
     * Set general objective
     */
    @Action( SetGeneralObjective )
    SetGeneralObjective(ctx: StateContext<EnvironmentalProjectModel>, action: SetGeneralObjective) {
        ctx.setState( patch({
            ...ctx.getState(),
            lapseSelected: patch({
                ...ctx.getState().lapseSelected,
                generalObjective: action.generalObjective
            })
        }) );

        this.InternalLapseUpdate(ctx);
    }

    // -- Selecting lapse updates one of the three lapses --
    InternalLapseUpdate(ctx?: StateContext<EnvironmentalProjectModel>): void {
        switch (this.referencingLapse) {
            case '1':
                ctx.setState(
                    patch({
                        lapse1: ctx.getState().lapseSelected,
                    })
                );
                break;
            case '2':
                ctx.setState(
                    patch({
                        lapse2: ctx.getState().lapseSelected,
                    })
                );
                break;
            case '3':
                ctx.setState(
                    patch({
                        lapse3: ctx.getState().lapseSelected,
                    })
                );

                break;
        }
    }
}
