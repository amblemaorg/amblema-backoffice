import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { WebHome, Slider } from '../models/web/web-home.model';
import { WebHomeService } from '../services/web-home.service';
import { patch, append, updateItem } from '@ngxs/store/operators';


export class GetWebHome {
    static readonly type = '[WebHome] Get Web Home';
}

export class SetWebHome {
    static readonly type = '[WebHome] Set Web Home'; 
    constructor( public payload: WebHome ) {}
}

export class SetSlider {
    static readonly type = '[Slider] Set Slider';
    constructor( public payload: Slider ) {}
}

export class UpdateSlider {
    static readonly type = '[Slider] Update Slider'; 
    constructor( public oldSlider: Slider,  public newSlider: Slider ) {}
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

    @Action(SetWebHome) 
    setWebHome( ctx : StateContext<WebHome>, action: SetWebHome ) {
        ctx.setState( action.payload );
    }

    @Action(SetSlider)
    setSlider( ctx: StateContext<WebHome>, action: SetSlider ) {
        ctx.setState(
            patch({
                slider: append([action.payload])
            })
        )
    }

    @Action( UpdateSlider )
    updateSlider( ctx: StateContext<WebHome>, action: UpdateSlider ) {
        ctx.setState(
            patch({
                slider: updateItem<Slider>( slider => slider === action.oldSlider, action.newSlider )
            })
        )
    } 
}