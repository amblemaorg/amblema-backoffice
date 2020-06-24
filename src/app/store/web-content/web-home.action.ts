import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { WebHome } from '../../_models/web/web-home.model';
import { WebHomeService } from '../../services/web-content/web-home.service';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';
import { CustomToastrService } from '../../services/helper/custom-toastr.service';
import { Slider } from '../../_models/web/slider.model';
import { Testimonial } from '../../_models/web/testimonial.model';

// -- Web Home class action --

export class GetWebHome {
    static readonly type = '[WebHome] Get Web Home';
}

export class SetWebHome {
    static readonly type = '[WebHome] Set Web Home';
    constructor(public payload: WebHome) { }
}

// -- Slider class action --

export class SetSliderWebHome {
    static readonly type = '[Slider] Set Slider';
    constructor(public payload: Slider) { }
}

export class UpdateSliderWebHome {
    static readonly type = '[Slider] Update Slider';
    constructor(public oldSlider: Slider, public newSlider: Slider) { }
}

export class DeleteSliderWebHome {
    static readonly type = '[Slider] Delete Slider';
    constructor(public payload: Slider) { }
}

// -- Testimonial class action --

export class SetTestimonialWebHome {
    static readonly type = '[Testimonial] Set Testimonial';
    constructor(public payload: Testimonial) { }
}

export class UpdateTestimonialWebHome {
    static readonly type = '[Testimonial] Update Testimonial';
    constructor(public oldTestimonial: Testimonial, public newTestimonial: Testimonial) { }
}

export class DeleteTestimonialWebHome {
    static readonly type = '[Testimonial] Delete Testimonial';
    constructor(public payload: Testimonial) { }
}

@State<WebHome>({
    name: 'webhome',
    defaults: {
        slider: [],
        aboutUsText: '',
        environmentText: '',
        readingText: '',
        mathText: '',
        testimonials: []
    }
})
export class WebHomeState implements NgxsOnInit {

    @Selector()
    static webHome(state: WebHome): WebHome | null {
        return state;
    }

    constructor(
        private toastr: CustomToastrService,
        private webHomeService: WebHomeService
    ) { }

    ngxsOnInit(ctx: StateContext<WebHome>) {
        ctx.dispatch(new GetWebHome());
    }

    @Action(GetWebHome)
    getWebHome(ctx: StateContext<WebHome>) {
        return this.webHomeService.getContentWebHome()
            .subscribe(response => {
                if (response) { // <-- Void null object
                    const webHome: any = response;
                    ctx.setState(webHome);
                }
            });
    }

    // -- Web Home actions --

    @Action(SetWebHome)
    setWebHome(ctx: StateContext<WebHome>, action: SetWebHome) {
        ctx.patchState(action.payload);

    }

    // -- Slider actions --

    @Action(SetSliderWebHome)
    setSliderWebHome(ctx: StateContext<WebHome>, action: SetSliderWebHome) {
        ctx.setState(
            patch({
                slider: append([action.payload])
            })
        );
    }

    @Action(UpdateSliderWebHome)
    updateSliderWebHome(ctx: StateContext<WebHome>, action: UpdateSliderWebHome) {
        ctx.setState(
            patch({
                slider: updateItem<Slider>(slider => slider === action.oldSlider, action.newSlider)
            })
        );
    }

    @Action(DeleteSliderWebHome)
    deleteSliderWebHome(ctx: StateContext<WebHome>, action: DeleteSliderWebHome) {
        ctx.setState(
            patch({
                slider: removeItem<Slider>(slider => slider === action.payload)
            })
        );
    }

    // -- Testimonial actions --

    @Action(SetTestimonialWebHome)
    setTestimonialWebHome(ctx: StateContext<WebHome>, action: SetTestimonialWebHome) {
        ctx.setState(
            patch({
                testimonials: append([action.payload])
            })
        );
    }

    @Action(UpdateTestimonialWebHome)
    updateTestimonialWebHome(ctx: StateContext<WebHome>, action: UpdateTestimonialWebHome) {
        ctx.setState(
            patch({
                testimonials: updateItem<Testimonial>(testimonial => testimonial === action.oldTestimonial, action.newTestimonial)
            })
        );
    }

    @Action(DeleteTestimonialWebHome)
    deleteTestimonialWebHome(ctx: StateContext<WebHome>, action: DeleteTestimonialWebHome) {
        ctx.setState(
            patch({
                testimonials: removeItem<Testimonial>(testimonial => testimonial === action.payload)
            })
        );
    }
}
