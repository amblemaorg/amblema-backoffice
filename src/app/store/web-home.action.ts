import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { WebHome, Slider, Testimonial } from '../models/web/web-home.model';
import { WebHomeService } from '../services/web-home.service';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';

// Web Home class action

export class GetWebHome {
    static readonly type = '[WebHome] Get Web Home';
}

export class SetWebHome {
    static readonly type = '[WebHome] Set Web Home'; 
    constructor( public payload: WebHome ) {}
}

// Slider class action

export class SetSliderWebHome {
    static readonly type = '[Slider] Set Slider';
    constructor( public payload: Slider ) {}
}

export class UpdateSliderWebHome {
    static readonly type = '[Slider] Update Slider'; 
    constructor( public oldSlider: Slider,  public newSlider: Slider ) {}
}

export class DeleteSliderWebHome {
    static readonly type = '[Slider] Delete Slider';
    constructor( public payload: Slider ) {}
}

// Testimonial class action

export class SetTestimonialWebHome {
    static readonly type = '[Testimonial] Set Testimonial';
    constructor( public payload: Testimonial ) {}
}

export class UpdateTestimonialWebHome {
    static readonly type = '[Testimonial] Update Testimonial';
    constructor( public oldTestimonial: Testimonial, public newTestimonial: Testimonial ) {}
}

export class DeleteTestimonialWebHome {
    static readonly type = '[Testimonial] Delete Testimonial';
    constructor( public payload: Testimonial ) {}
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
    static webHome( state : WebHome ) : WebHome | null {
        return state; 
    }

    constructor(
        private webHomeService: WebHomeService
    ) {}

    ngxsOnInit( ctx: StateContext<WebHome> ) {
        ctx.dispatch( new GetWebHome() );
    }

    @Action( GetWebHome )
    getWebHome( ctx: StateContext<WebHome>) {
        return this.webHomeService.getContentWebHome()
            .subscribe( response => {       

                // Void null object
                if( response ) {
                    ctx.setState( response );
                }
            });  
    }

    // Web Home actions

    @Action(SetWebHome) 
    setWebHome( ctx : StateContext<WebHome>, action: SetWebHome ) {
        ctx.setState( action.payload );
    }

    // Slider actions

    @Action(SetSliderWebHome)
    setSlider( ctx: StateContext<WebHome>, action: SetSliderWebHome ) {
        ctx.setState(
            patch({
                slider: append([action.payload])
            })
        )
    }

    @Action( UpdateSliderWebHome )
    updateSlider( ctx: StateContext<WebHome>, action: UpdateSliderWebHome ) {
        ctx.setState(
            patch({
                slider: updateItem<Slider>( slider => slider === action.oldSlider, action.newSlider )
            })
        )
    } 

    @Action( DeleteSliderWebHome )
    deleteSlider( ctx: StateContext<WebHome>, action: DeleteSliderWebHome ) {
        ctx.setState(
            patch({
                slider: removeItem<Slider>( slider => slider === action.payload )
            })
        );
    } 

    // Testimonial actions


}