import { WebAbout, Award } from '../models/web/web-about.model';
import { Slider } from '../models/web/slider.model';
import { State, StateContext, Selector, Action, NgxsOnInit } from '@ngxs/store';
import { CustomToastrService } from '../services/custom-toastr.service';
import { WebAboutService } from '../services/web-content/web-about.service';
import { append, patch, updateItem, removeItem } from '@ngxs/store/operators';

// -- Web about's class actions --

export class GetWebAbout {
    static readonly type = '[WebAbout] Get Web About';
}

export class SetWebAbout {
    static readonly type = '[WebAbout] Set Web About';
    constructor(public payload: WebAbout) { }
}

// -- Slider's class actions --

export class SetSliderWebAbout {
    static readonly type = '[Slider] Set Slider';
    constructor(public payload: Slider) { }
}

export class UpdateSliderWebAbout {
    static readonly type = '[Slider] Update Slider';
    constructor(public oldSlider: Slider, public newSlider: Slider) { }
}

export class DeleteSliderWebAbout {
    static readonly type = '[Slider] Delete Slider';
    constructor(public payload: Slider) { }
}

// -- Award's class actions --

export class SetAwardWebAbout {
    static readonly type = '[Award] Set Award';
    constructor(public payload: Award) { }
}

export class UpdateAwardWebAbout {
    static readonly type = '[Award] Update Award';
    constructor(public oldAward: Award, public newAward: Award) { }
}

export class DeleteAwardWebAbout {
    static readonly type = '[Award] Delete Testimonial';
    constructor(public payload: Award) { }
}


@State<WebAbout>({
    name: 'webabout',
    defaults: {
        aboutUsPage: {
            slider: [],
            aboutUsText: '',
            environmentText: '',
            readingText: '',
            mathText: '',
            awards: []
        }
    }
})
export class WebAboutState implements NgxsOnInit {

    @Selector()
    static webAbout(state: WebAbout): WebAbout | null {
        return state;
    }

    constructor(
        private toastr: CustomToastrService,
        private webAboutService: WebAboutService
    ) {
    }

    ngxsOnInit(ctx: StateContext<WebAbout>) {
        ctx.dispatch(new GetWebAbout());
    }

    // -- Web about's actions --

    @Action(GetWebAbout)
    getWebAbout(ctx: StateContext<WebAbout>) {
        return this.webAboutService.getContentWebAbout()
            .subscribe(response => {
                if (response.aboutUsPage) {
                    ctx.setState( { aboutUsPage: response.aboutUsPage } );
                }
            });
    }

    @Action(SetWebAbout)
    setWebAbout(ctx: StateContext<WebAbout>, action: SetWebAbout) {
        ctx.setState({
            ...ctx.getState(),
            aboutUsPage: {
                ...ctx.getState().aboutUsPage,
                aboutUsText: action.payload.aboutUsPage.aboutUsText,
                environmentText: action.payload.aboutUsPage.environmentText,
                readingText: action.payload.aboutUsPage.readingText,
                mathText: action.payload.aboutUsPage.mathText,
            }
        });

        this.webAboutService.setContentWebAbout(ctx.getState()).subscribe(response => {
            this.toastr.updateSuccess('Actualizacion', 'Contenido de la página guardado.');
        }, (err: any) => {
            this.toastr.error('Error', 'No se ha completado el registro.');

        });
    }

    // -- Slider's actions --

    @Action(SetSliderWebAbout)
    setSliderWebAbout(ctx: StateContext<WebAbout>, action: SetSliderWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                slider : append([action.payload])
            })
        }));
    }

    @Action(UpdateSliderWebAbout)
    updateSliderWebAbout(ctx: StateContext<WebAbout>, action: UpdateSliderWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                slider : updateItem<Slider>(slider => slider === action.oldSlider, action.newSlider)
            })
        }));
    }

    @Action(DeleteSliderWebAbout)
    deleteSliderWebAbout(ctx: StateContext<WebAbout>, action: DeleteSliderWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                slider: removeItem<Slider>(slider => slider === action.payload)
            })
        }));
    }

    // -- Award's actions --

    @Action(SetAwardWebAbout)
    setAwardWebAbout(ctx: StateContext<WebAbout>, action: SetAwardWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                awards : append([action.payload])
            })
        }));
    }

    @Action(UpdateAwardWebAbout)
    updateAwardWebAbout(ctx: StateContext<WebAbout>, action: UpdateAwardWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                awards : updateItem<Award>(award => award === action.oldAward, action.newAward)
            })
        }));
    }

    @Action(DeleteAwardWebAbout)
    deleteAwardWebAbout(ctx: StateContext<WebAbout>, action: DeleteAwardWebAbout) {
        ctx.setState(patch({
            aboutUsPage : patch({
                awards: removeItem<Award>(award => award === action.payload)
            })
        }));
    }
}
