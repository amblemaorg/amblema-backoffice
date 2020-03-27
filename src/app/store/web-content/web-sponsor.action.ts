import { Testimonial } from '../../models/web/testimonial.model';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { WebSponsor } from '../../models/web/web-sponsor.model';
import { append, patch, updateItem, removeItem } from '@ngxs/store/operators';
import { CustomToastrService } from '../../services/helper/custom-toastr.service';
import { WebSponsorService } from '../../services/web-content/web-sponsor.service';


// -- Web Sponsor class action --

export class GetWebSponsor {
    static readonly type = '[WebSponsor] Get Web Sponsor';
}

export class SetWebSponsor {
    static readonly type = '[WebSponsor] Set Web Sponsor';
    constructor(public payload: WebSponsor) {}
}

// -- Testimonial class action --

export class SetTestimonialWebSponsor {
    static readonly type = '[Testimonial] Set Testimonial';
    constructor(public payload: Testimonial) { }
}

export class UpdateTestimonialWebSponsor {
    static readonly type = '[Testimonial] Update Testimonial';
    constructor(public oldTestimonial: Testimonial, public newTestimonial: Testimonial) { }
}

export class DeleteTestimonialWebSponsor {
    static readonly type = '[Testimonial] Delete Testimonial';
    constructor(public payload: Testimonial) { }
}

@State<WebSponsor>({
    name : 'websponsor',
    defaults: {
        sponsorPage: {
            backgroundImage: '',
            testimonials: [],
            steps: []
        }
    }
})
export class WebSponsorState implements NgxsOnInit {

    @Selector()
    static webSponsor(state: WebSponsor): WebSponsor | null {
        return state;
    }

    constructor(
        private toastr: CustomToastrService,
        private webSponsorService: WebSponsorService
    ) {}

    ngxsOnInit( ctx: StateContext<WebSponsor> ) {
        ctx.dispatch( new GetWebSponsor() );
    }

    // -- Web sponsor's actions --

    @Action(GetWebSponsor)
    getWebSponsor(ctx: StateContext<WebSponsor>) {
        return this.webSponsorService.getContentWebSponsor()
            .subscribe(response => {
                if (response.sponsorPage) {
                    ctx.setState( { sponsorPage: response.sponsorPage } );
                }
            });
    }

    @Action(SetWebSponsor)
    setWebSponsor(ctx: StateContext<WebSponsor>, action: SetWebSponsor ) {
        ctx.setState({
            ...ctx.getState(),
            sponsorPage: {
                ...ctx.getState().sponsorPage,
                backgroundImage: action.payload.sponsorPage.backgroundImage,
                steps: action.payload.sponsorPage.steps
            }
        });

        this.webSponsorService.setContentWebSponsor( ctx.getState() ).subscribe( response => {
            this.toastr.updateSuccess('Actualizacion', 'Contenido de la página padrinos guardado.');
        }, (err: any) => {
            this.toastr.error('Error', 'No se ha completado el registro.');
        });
    }

    // -- Testimonial actions --

    @Action(SetTestimonialWebSponsor)
    setTestimonialWebSponsor(ctx: StateContext<WebSponsor>, action: SetTestimonialWebSponsor) {
        ctx.setState(patch({
            sponsorPage : patch({
                testimonials: append([action.payload])
            })
        }));
    }

    @Action(UpdateTestimonialWebSponsor)
    updateTestimonialWebSponsor(ctx: StateContext<WebSponsor>, action: UpdateTestimonialWebSponsor) {
        ctx.setState(patch({
            sponsorPage : patch({
                testimonials: updateItem<Testimonial>(testimonial => testimonial === action.oldTestimonial, action.newTestimonial)
            })
        }));
    }

    @Action(DeleteTestimonialWebSponsor)
    deleteTestimonialWebSponsor(ctx: StateContext<WebSponsor>, action: DeleteTestimonialWebSponsor) {
        ctx.setState(patch({
            sponsorPage : patch({
                testimonials: removeItem<Testimonial>(testimonial => testimonial === action.payload)
            })
        }));
    }
}
