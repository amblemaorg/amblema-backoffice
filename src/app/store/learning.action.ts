import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { Learning } from '../models/learning.model';
import { Utility } from '../helpers/utility';
import { LearningService } from '../services/learning.service';
import { Video } from '../models/media.model';

// -- State Model --

interface LearningStateModel {
    learning?: Learning;
    learnings?: Learning[];
}

// -- Actions --

export class GetLearnings {
    static readonly type = '[Learnings] Get Learnings';
}

export class GetLearning {
    static readonly type = '[Learning] Get Learning';
}

// -- Step One --

export class SetLearningOne {
    static readonly type = '[Learning] Set Learning One';
    constructor(public payload: Learning) { }
}

export class UpdateLearningOne {
    static readonly type = '[Learning] Update Learning One';
    constructor(public payload: Learning) {}
}

// -- Step Two --



// -- Step three -- 

export class SetVideos {
    static readonly type = '[Learning] Set Learning Videos';
    constructor(public payload: Video[]) { }
}

// -- Init state --
@State<LearningStateModel>({
    name: 'Learning',
    defaults: {
        learning: {
            id: '',
            title: '',
            description: '',
            secondaryTitle: '',
            secondaryDescription: '',
            objetives: [], 
            slider: [],
            images: [],
            duration: ' ', 
            points: '',
            quizzes: []
        },
        learnings: []
    }
})
export class LearningState implements NgxsOnInit {

    @Selector()
    static learning(state: LearningStateModel): Learning | null {
        return state.learning;
    }

    constructor(
        private helper: Utility,
        private learningService: LearningService
    ) { }

    ngxsOnInit(ctx: StateContext<LearningStateModel>) {
        ctx.dispatch(new GetLearnings());
    }

    // -- Actions Learning -- 

    @Action(GetLearnings)
    getLearnings(ctx: StateContext<LearningStateModel>) {

    }

    // -- Step One --

    @Action(SetLearningOne)
    setLearningOne(ctx: StateContext<LearningStateModel>, action: SetLearningOne) {
        console.log(action.payload); 
        ctx.setState({
            learning: action.payload,
        });
    }

    @Action(UpdateLearningOne)
    updateLearningOne( ctx: StateContext<LearningStateModel>, action: UpdateLearningOne ) {
        ctx.patchState({
            learning: action.payload
        });
    }

    // -- Step Two --

    @Action(SetVideos)
    setVideos(ctx: StateContext<LearningStateModel>, action: SetVideos) {
        
    }
}
