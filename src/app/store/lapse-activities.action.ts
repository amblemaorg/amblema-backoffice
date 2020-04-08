import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { LapseActivity, Activity } from '../models/lapse-activities.model';
import { LapseActivitiesService } from '../services/lapse-activities.service';


export interface LapseActivityModel {
    activittySelected: Activity;
    lapses: LapseActivity;
}

export class GetLapActivities {
    static readonly type = '[LapActivities] Get LapActivities';
}

@State<LapseActivityModel>({
    name: 'lapseactivities',
    defaults: {
        activittySelected: {
            id: '',
            name: ' ',
            hasText: false,
            hasDate: false,
            hasFile: false,
            hasVideo: false,
            hasChecklist: false,
            hasUpload: false,
            text: '',
            file: null,
            video: [],
            checklist: [],
            approvalType: '',
            status: ''
        },
        lapses: {
            lapse1: [],
            lapse2: [],
            lapse3: []
        }
    }
})
export class LapseActivityState implements NgxsOnInit {

    @Selector()
    static LapseActivity( state: LapseActivityModel ): LapseActivityModel | null {
        return state;
    }

    @Selector()
    static lapses( state: LapseActivityModel ) : LapseActivity | null {
        return state.lapses; d
    }

    ngxsOnInit(ctx: StateContext<LapseActivityModel>): void {
        ctx.dispatch(new GetLapActivities());
    }

    constructor(
        private lapseActivities: LapseActivitiesService
    ) { }

    @Action(GetLapActivities)
    getLapActivities(ctx: StateContext<LapseActivityModel>) {

        this.lapseActivities.getLapseActivities().subscribe(response => {

            ctx.setState({
                activittySelected: ctx.getState().activittySelected,
                lapses: response
            });

        });
    }
}
