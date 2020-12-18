import { State, NgxsOnInit, Action, StateContext, Store, Selector } from '@ngxs/store';
import { Step } from '../_models/step.model';
import { StepService } from '../services/step.service';
import { patch, removeItem, append, updateItem } from '@ngxs/store/operators';
import { KIND_STEP } from '../pages/main-content/steps/_shared/shared';
import { Injectable } from '@angular/core';

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

export class DeleteStep {
    static readonly type = '[Step] Delete Step';
    constructor( public payload: string ) {}
}

export class UpdateStep {
    static readonly type = '[Step] Update Step';
    constructor( public newStep: Step, public oldStep: Step ) {  }
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
@Injectable()
export class StepState implements NgxsOnInit {

    @Selector()
    static generalSteps( state: StepStateModel ): Step[] | null {
        const generals: Step[] = state.steps.filter( (value) => value.tag === KIND_STEP.GENERAL.CODE );
        return generals;
    }

    @Selector()
    static sponsorSteps( state: StepStateModel ): Step[] | null {
        const sponsors: Step[] = state.steps.filter( (value) => value.tag === KIND_STEP.SPONSOR.CODE );
        return sponsors;
    }

    @Selector()
    static coordinatorSteps( state: StepStateModel ): Step[] | null {
        const coordinators: Step[] = state.steps.filter( (value) => value.tag === KIND_STEP.COORDINATOR.CODE );
        return coordinators;
    }

    @Selector()
    static schoolSteps( state: StepStateModel ): Step[] | null {
        const schools: Step[] = state.steps.filter( (value) => value.tag === KIND_STEP.SCHOOL.CODE );
        return schools;
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
        ctx.setState(patch({
            ...ctx.getState(),
            steps: append([action.payload])
        }));
    }

    @Action(UpdateStep)
    updateStep(ctx: StateContext<StepStateModel>, action: UpdateStep) {

        ctx.setState(patch({
            ...ctx.getState(),
            steps: updateItem<Step>(step => step.id === action.oldStep.id, action.newStep)
        }));

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

    @Action( DeleteStep  )
    deleteStep( ctx: StateContext<StepStateModel>, action: DeleteStep ) {

        ctx.setState(patch({
            ...ctx.getState(),
            steps: removeItem<Step>(step => step.id === action.payload)
        }));

    }
}
