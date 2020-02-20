import { WebAbout, AboutUsPage } from '../models/web/web-about.model';
import { Slider } from '../models/web/sldier.model';
import { State, StateContext, Selector, Action, NgxsOnInit } from '@ngxs/store';
import { CustomToastrService } from '../services/custom-toastr.service';
import { WebAboutService } from '../services/web-content/web-about.service';
import { append, patch } from '@ngxs/store/operators';

// Web about class action

export class GetWebAbout {
    static readonly type = '[WebAbout] Get Web About';
}

export class SetWebAbout {
    static readonly type = '[WebAbout] Set Web About';
    constructor(public payload: WebAbout) { }
}

// Slider class action

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

    @Action(GetWebAbout)
    getWebAbout(ctx: StateContext<WebAbout>) {
        return this.webAboutService.getContentWebAbout()
            .subscribe(response => {
                if (response.aboutUsPage) {
                    ctx.setState( { aboutUsPage: response.aboutUsPage } ); 
                }
            });
    }

    // Slider actions

    @Action(SetSliderWebAbout)
    setSliderWebAbout(ctx: StateContext<AboutUsPage>, action: SetSliderWebAbout) {

        ctx.setState(patch({
            slider: append([action.payload])
        }));

        // ctx.setState((ctx) => ({
        //     ...ctx,
        //     slider: action.payload
        // }))

        // ctx.setState(patch({
        //     // aboutUsPage: {
        //     //     ...ctx.getState().aboutUsPage,
        //     //     slider: append([action.payload])
        //     // }
        //     //...slider: append([action.payload])
        // }));
    }

    // @Action(UpdateSliderWebAbout)
    // updateSliderWebAbout(ctx: StateContext<WebAbout>, action: UpdateSliderWebAbout) {
    //     ctx.setState(
    //         patch({
    //             slider: updateItem<Slider>(slider => slider === action.oldSlider, action.newSlider)
    //         })
    //     );
    // }

    // @Action(DeleteSliderWebAbout)
    // deleteSliderWebAbout(ctx: StateContext<WebAbout>, action: DeleteSliderWebAbout) {
    //     ctx.setState(
    //         patch({
    //             slider: removeItem<Slider>(slider => slider === action.payload)
    //         })
    //     );
    // }
}