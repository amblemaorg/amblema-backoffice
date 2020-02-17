import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { Learning } from '../models/learning.model';
import { Utility } from '../helpers/utility';
import { LearningService } from '../services/learning.service';

// State Model

interface LearningStateModel {
    learning: Learning;
    learnings: Learning[];
}

// Actions

export class GetLearnings {
    static readonly type = '[Learnings] Get Learnings';
}

export class GetLearning {
    static readonly type = '[Learning] Get Learning';
}

// Actions step one

export class SetLearningOne {
    static readonly type = '[Learning] Set Learning One';
    constructor(public payload: Learning) { }
}

// Init state

@State<LearningStateModel>({
    name: 'Learning',
    defaults: {
        learning: null,
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

    // Init
    ngxsOnInit(ctx: StateContext<LearningStateModel>) {
        ctx.dispatch(new GetLearnings());
    }

    // Get all Learnings

    @Action(GetLearnings)
    getLearnings(ctx: LearningStateModel) {

    }

    // ------------------------------------------
    // CRUD Step one
    // ------------------------------------------

    @Action(SetLearningOne)
    setLearningOne( ctx: StateContext<LearningStateModel>, action: SetLearningOne ) {
        ctx.setState({
            learning: action.payload,
            learnings: ctx.getState().learnings
        });
    }
}
