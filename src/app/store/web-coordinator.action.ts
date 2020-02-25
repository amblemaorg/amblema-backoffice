import { WebCoordinator } from '../models/web/web-coordinator.model';
import { Testimonial } from '../models/web/testimonial.model';
import { State, NgxsOnInit, StateContext, Selector, Action } from '@ngxs/store';
import { CustomToastrService } from '../services/custom-toastr.service';
import { WebCoordinatorService } from '../services/web-content/web-coordinator.service';

// -- Web coordinator class action --

export class GetWebCoordinator {
    static readonly type = "[WebCoordinator] Get Web Coordinator";
}

export class SetWebCoordinator {
    static readonly type = "[WebCoordinator] Set Web Coordinator";
    constructor( public payload: WebCoordinator ) {}
}

// -- Testimonial class action --

export class SetTestimonialWebCoordinator {
    static readonly type = '[Testimonial] Set Testimonial';
    constructor(public payload: Testimonial) { }
}

export class UpdateTestimonialWebCoordinator {
    static readonly type = '[Testimonial] Update Testimonial';
    constructor(public oldTestimonial: Testimonial, public newTestimonial: Testimonial) { }
}

export class DeleteTestimonialWebCoordinator {
    static readonly type = '[Testimonial] Delete Testimonial';
    constructor(public payload: Testimonial) { }
}

@State<WebCoordinator>({
    name: 'webcoordinator',
    defaults: {
        coordinatorPage: {
            backgroundImage: '', 
            testimonials: [], 
            steps: []
        }
    }
})
export class WebCoordinatorState implements NgxsOnInit {

    @Selector()
    static webSponsor(state: WebCoordinator): WebCoordinator | null {
        return state;
    }

    constructor(
        private toastr: CustomToastrService,
        private webCoordinatorService: WebCoordinatorService
    ) {}

    ngxsOnInit( ctx: StateContext<WebCoordinator> ) {

    }  
    
    // -- Web sponsor's actions --

    @Action(GetWebCoordinator)
    getWebSponsor(ctx: StateContext<WebCoordinator>) {
        return this.webCoordinatorService.getContentWebCoordinator()
            .subscribe(response => {
                if (response.coordinatorPage) {
                    ctx.setState( { coordinatorPage: response.coordinatorPage } );
                }
            });
    }

    @Action(SetWebCoordinator)
    setWebCoordinator(ctx :StateContext<WebCoordinator>, action: SetWebCoordinator ) {        
        ctx.setState({
            ...ctx.getState(), 
            coordinatorPage: {
                ...ctx.getState().coordinatorPage, 
                backgroundImage: action.payload.coordinatorPage.backgroundImage,
                steps: action.payload.coordinatorPage.steps
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