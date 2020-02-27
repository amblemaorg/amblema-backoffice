import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { Learning, SliderMedia } from '../models/learning.model';
import { Utility } from '../helpers/utility';
import { LearningService } from '../services/learning.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';

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
    constructor(public payload: Learning) { }
}

// -- Step Two --

export class SetMedia {
    static readonly type = '[Media] Set Media';
    constructor(public payload: SliderMedia) { }
}

export class GetMedias {
    static readonly type = '[Media] Get Medias';
    constructor(public payliad: SliderMedia[]) { }
}

export class DeleteMedia {
    static readonly type = '[Media] Delete Media';
    constructor(public payload: SliderMedia) { }
}

export class UpdateMedia {
    static readonly type = '[Media] Update Media';
    constructor(public oldMedia: SliderMedia, public newMedia: SliderMedia) { }
}

// -- Step Three --

export class SetLearningTwo {
    static readonly type = '[Learning] Set Learning Two';
    constructor( public payload: Learning ) {}
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
            objectives: [],
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

    @Selector()
    static medias(state: LearningStateModel): SliderMedia[] | null {
        return state.learning.slider;
    }

    constructor(
        private helper: Utility,
        private learningService: LearningService
    ) { }

    ngxsOnInit(ctx: StateContext<LearningStateModel>) {
        // ctx.dispatch(new GetLearnings());
    }

    // -- Actions Learning --

    @Action(GetLearnings)
    getLearnings(ctx: StateContext<LearningStateModel>) {

    }

    // -- Step One --

    @Action(SetLearningOne)
    setLearningOne(ctx: StateContext<LearningStateModel>, action: SetLearningOne) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                title: action.payload.title,
                description: action.payload.description,
                duration: action.payload.duration,
                points: action.payload.points,
                objectives: action.payload.objectives,
            })
        }));
    }

    @Action(UpdateLearningOne)
    updateLearningOne(ctx: StateContext<LearningStateModel>, action: UpdateLearningOne) {
        ctx.patchState({
            learning: action.payload
        });
    }

    // -- Step Two --

    @Action(SetMedia)
    setMedia(ctx: StateContext<LearningStateModel>, action: SetMedia) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                slider: append([action.payload])
            })
        }));
    }

    @Action(DeleteMedia)
    deleteMedia(ctx: StateContext<LearningStateModel>, action: DeleteMedia) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                slider: removeItem<SliderMedia>( sliderMedia => sliderMedia === action.payload )
            })
        }));
    }

    @Action(UpdateMedia)
    updateMedia(ctx: StateContext<LearningStateModel>, action: UpdateMedia) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                slider: updateItem<SliderMedia>(sliderMedia => sliderMedia === action.oldMedia, action.newMedia)
            })
        }));
    }

    // -- Step Three --

    @Action(SetLearningTwo)
    setLearningTwo(ctx: StateContext<LearningStateModel>, action: SetLearningTwo) {

    }
}
