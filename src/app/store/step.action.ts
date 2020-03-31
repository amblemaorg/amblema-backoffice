import { State, NgxsOnInit, Action, StateContext, Store, Selector } from '@ngxs/store';
import { Step } from '../models/step.model';
import { StepService } from '../services/step.service';
import { patch } from '@ngxs/store/operators';
import { KIND_STEP } from '../pages/main-content/steps/_shared/shared';

interface StepStateModel {
    step: Step;
    steps: Step[];
}

// -- Actions --

export class GetSteps {
    static readonly type = '[Steps] Get Steps';
}

export class AddStep {
    static readonly type = '[Step] Add Step';
    constructor(public payload: Step) { }
}

@State<StepStateModel>({
    name: 'steps',
    defaults: {
        step: {
            id: '',
            name: '',
            devName: '',
            tag: '',

            // Check fields --
            hasText: false,
            hasDate: false,
            hasFile: false,
            hasVideo: false,
            hasChecklist: false,
            hasUpload: false,
            // ----------------

            // ----------------
            text: '',
            file: '',
            video: '',
            checklist: [],
            // ----------------

            approvalType: '',
            isStandard: false,
            status: '',
        },
        steps: []
    }
})

export class StepState implements NgxsOnInit {

    @Selector()
    static generalSteps( state: StepStateModel ): Step[] | null {
        const generals: Step[] = state.steps.filter( (value) => value.tag === KIND_STEP.GENERAL.CODE );
        return generals;
    }

    @Selector()
    static sponsorStandardSteps( state: StepStateModel ) : Step[] | null {
        const sponsors: Step[] = state.steps.filter( (value) => (value.tag === KIND_STEP.SPONSOR.CODE && value.isStandard === true ));
        return sponsors; 
    }

    constructor(
        private store: Store,
        private stepService: StepService
    ) {}

    ngxsOnInit() {
        this.store.dispatch(new GetSteps() );
    }

    @Action(AddStep)
    addStep(ctx: StateContext<StepStateModel>, action: AddStep) {
        // this.stepService.setStep(action).subscribe(response => {
        //     console.log(response);
        // });
    }

    @Action(GetSteps)
    getSteps( ctx: StateContext<StepStateModel>, action: GetSteps ) {
        this.stepService.getSteps().subscribe( response => {

            ctx.setState(patch({
                ...ctx.getState(),
                steps: response
            }));
        } );
    }
}
