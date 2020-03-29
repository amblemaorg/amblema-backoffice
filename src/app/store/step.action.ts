import { State, NgxsOnInit, Action, StateContext } from '@ngxs/store';
import { Step } from '../models/step.model';
import { StepService } from '../services/step.service';


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
            isStandard: '',
            status: '',
        },
        steps: []
    }
})

export class StepState implements NgxsOnInit {

    constructor(
        private stepService: StepService
    ) {}

    ngxsOnInit() { }

    @Action(AddStep)
    addStep(ctx: StateContext<StepStateModel>, action: AddStep) {
        // this.stepService.setStep(action).subscribe(response => {
        //     console.log(response);
        // });
    }
}
