import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { Learning } from '../models/learning.model';
import { Utility } from '../helpers/utility';
import { LearningService } from '../services/learning.service';
import { ACTION } from '../helpers/text-content/text-crud';
import { Video } from '../models/media.model';

// State Model

interface LearningStateModel {
    learning?: Learning;
    learnings?: Learning[];
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

export class SetVideos {
    static readonly type = '[Learning] Set Learning Videos';
    constructor(public payload: Video[]) { }
}
// Init state

@State<LearningStateModel>({
    name: 'Learning',
    defaults: {
        learning: {
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

    // Init
    ngxsOnInit(ctx: StateContext<LearningStateModel>) {
        ctx.dispatch(new GetLearnings());
    }

    // Get all Learnings

    @Action(GetLearnings)
    getLearnings(ctx: StateContext<LearningStateModel>) {

    }

    // ------------------------------------------
    // CRUD Step one                            -
    // ------------------------------------------

    @Action(SetLearningOne)
    setLearningOne(ctx: StateContext<LearningStateModel>, action: SetLearningOne) {
        ctx.setState({
            learning: action.payload,
        });
    }

    @Action(SetVideos)
    setVideos(ctx: StateContext<LearningStateModel>, action: SetVideos) {
    }
}
