import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { Learning, SliderMedia, Quizze } from '../models/learning.model';
import { Utility } from '../helpers/utility';
import { LearningService } from '../services/learning.service';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { Slider } from '../models/web/slider.model';
import { CustomToastrService } from '../services/helper/custom-toastr.service';

// -- State Model --

interface LearningStateModel {
    oldLearning?: Learning;
    learning?: Learning;
    learnings?: Learning[];
}

// -- Actions --

export class GetLearnings {
    static readonly type = '[Learnings] Get Learnings';
}

export class AddLearning {
    static readonly type = '[Learning] Add Learning';
    constructor(public payload: Learning) { }
}

export class UpdateLearning {
    static readonly type = '[Learning] Update Learning';
    constructor(public newLearning: Learning) { }
}

export class DeleteLearning {
    static readonly type = '[Learning] Delete Learning';
    constructor(public payload: Learning) { }
}

/* Previous selection */
export class SelectedLearning {
    static readonly type = '[Learning] Selected Learning';
    constructor(public payload: Learning) { }
}

/* Clear state selected */
export class ClearLearning {
    static readonly type = '[Learning] Clear Learning';
    constructor() { }
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
    constructor(public payload: Learning) { }
}

// -- Step Four --

export class SetImage {
    static readonly type = '[Image] Set Image';
    constructor(public payload: Slider) { }
}

export class UpdateImage {
    static readonly type = '[Image] Update Image';
    constructor(public oldImage: Slider, public newImage: Slider) { }
}

export class DeleteImage {
    static readonly type = '[Image] Delete Image';
    constructor(public payload: Slider) { }
}

// -- Step Five --

export class SetQuizze {
    static readonly type = '[Quizz] Set Quizze';
    constructor(public payload: Quizze) { }
}

export class UpdateQuizze {
    static readonly type = '[Quizz] Update Quizze';
    constructor(public oldQuizze: Quizze, public newQuizze: Quizze) { }
}

export class DeleteQuizze {
    static readonly type = '[Quizz] Delete Quizze';
    constructor(public payload: Quizze) { }
}


// -- Init state --
@State<LearningStateModel>({
    name: 'Learning',
    defaults: {
        oldLearning: {
            id: '',
            title: '',
            name: '',
            priority: null,
            description: '',
            secondaryTitle: '',
            secondaryDescription: '',
            objectives: [],
            slider: [],
            images: [],
            duration: ' ',
            quizzes: []
        },
        learning: {
            id: '',
            name: '',
            title: '',
            priority: null,
            description: '',
            secondaryTitle: '',
            secondaryDescription: '',
            objectives: [],
            slider: [],
            images: [],
            duration: ' ',
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
    static learnings(state: LearningStateModel): Learning[] | null {
        return state.learnings;
    }

    @Selector()
    static medias(state: LearningStateModel): SliderMedia[] | null {
        return state.learning.slider;
    }

    @Selector()
    static quizzes(state: LearningStateModel): Quizze[] | null {
        return state.learning.quizzes;
    }

    constructor(
        private helper: Utility,
        private learningService: LearningService,
        private toastr: CustomToastrService
    ) { }

    ngxsOnInit(ctx: StateContext<LearningStateModel>) {
        ctx.dispatch(new GetLearnings());
    }

    // -- Actions Learning --

    @Action(GetLearnings)
    getLearnings(ctx: StateContext<LearningStateModel>) {
        this.learningService.getLearnings().subscribe(response => {
            response.forEach(value => {
                value.slider = this.helper.mediaNumberToString(value.slider);
            });

            ctx.setState(patch({
                ...ctx.getState(),
                learnings: response
            }));
        });
    }

    @Action(SelectedLearning)
    selectedLearning(ctx: StateContext<LearningStateModel>, action: SelectedLearning) {
        ctx.setState({
            ...ctx.getState(),
            oldLearning: action.payload,
            learning: action.payload
        });
    }

    @Action(ClearLearning)
    clearLearning(ctx: StateContext<LearningStateModel>) {
        ctx.setState({
            ...ctx.getState(),
            oldLearning: {
                id: '',
                title: '',
                name: '',
                priority: null,
                description: '',
                secondaryTitle: '',
                secondaryDescription: '',
                objectives: [],
                slider: [],
                images: [],
                duration: ' ',
                quizzes: []
            },
            learning: {
                id: '',
                title: '',
                name: '',
                priority: null,
                description: '',
                secondaryTitle: '',
                secondaryDescription: '',
                objectives: [],
                slider: [],
                images: [],
                duration: ' ',
                quizzes: []
            }
        });
    }

    @Action(UpdateLearning)
    updateLearning(ctx: StateContext<LearningStateModel>, action: UpdateLearning) {

        this.learningService.updateLearning(action.newLearning.id, action.newLearning).subscribe(reponse => {
            ctx.setState(patch({
                ...ctx.getState(),
                learnings: updateItem<Learning>(learning => learning.id === action.newLearning.id, action.newLearning)
            }));

            this.toastr.updateSuccess('Actualización', 'Módulo de aprendizaje actualizado.');
        });
    }

    @Action(AddLearning)
    addLearning(ctx: StateContext<LearningStateModel>, action: AddLearning) {

        action.payload.slider = this.helper.mediaNumberToString(action.payload.slider);

        ctx.setState(patch({
            ...ctx.getState(),
            learnings: append([action.payload]),
        }));

        // -- Clear learning register --
        ctx.patchState({
            learning: {
                id: '',
                title: '',
                name: '',
                priority: null,
                description: '',
                secondaryTitle: '',
                secondaryDescription: '',
                objectives: [],
                slider: [],
                images: [],
                duration: ' ',
                quizzes: []
            }
        });
    }

    @Action(DeleteLearning)
    deleteLearning(ctx: StateContext<LearningStateModel>, action: DeleteLearning) {
        this.learningService.deleteLearning(action.payload.id).subscribe(response => {
            ctx.setState(patch({
                ...ctx.getState(),
                learnings: removeItem<Learning>(learning => learning === action.payload)
            }));

            this.toastr.deleteRegister('Eliminación', 'Modulo de aprendizaje eliminado');
        });
    }

    // -- Step One --

    @Action(SetLearningOne)
    setLearningOne(ctx: StateContext<LearningStateModel>, action: SetLearningOne) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                name: action.payload.name,
                title: action.payload.title,
                description: action.payload.description,
                duration: action.payload.duration,
                priority: action.payload.priority,
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
                slider: removeItem<SliderMedia>(sliderMedia => sliderMedia === action.payload)
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
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                secondaryTitle: action.payload.secondaryTitle,
                secondaryDescription: action.payload.secondaryDescription,
            })
        }));
    }

    // -- Step Four --

    @Action(SetImage)
    setImage(ctx: StateContext<LearningStateModel>, action: SetImage) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                images: append([action.payload])
            })
        }));
    }

    @Action(UpdateImage)
    updateImage(ctx: StateContext<LearningStateModel>, action: UpdateImage) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                images: updateItem<Slider>(image => image === action.oldImage, action.newImage)
            })
        }));
    }

    @Action(DeleteImage)
    deleteImage(ctx: StateContext<LearningStateModel>, action: DeleteImage) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                images: removeItem<Slider>(image => image === action.payload)
            })
        }));
    }

    // -- Step Five --

    @Action(SetQuizze)
    setQuizze(ctx: StateContext<LearningStateModel>, action: SetQuizze) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                quizzes: append([action.payload])
            })
        }));
    }

    @Action(UpdateQuizze)
    updateQuizze(ctx: StateContext<LearningStateModel>, action: UpdateQuizze) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                quizzes: updateItem<Quizze>(quizze => quizze === action.oldQuizze, action.newQuizze)
            })
        }));
    }

    @Action(DeleteQuizze)
    deleteQuizze(ctx: StateContext<LearningStateModel>, action: DeleteQuizze) {
        ctx.setState(patch({
            ...ctx.getState(),
            learning: patch({
                ...ctx.getState().learning,
                quizzes: removeItem<Quizze>(quizze => quizze === action.payload)
            })
        }));
    }

}
