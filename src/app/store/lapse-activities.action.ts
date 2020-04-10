import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { LapseActivity, Activity } from '../models/lapse-activities.model';
import { LapseActivitiesService } from '../services/lapse-activities.service';
import { patch } from '@ngxs/store/operators';

export interface LapseActivityModel {
    lapses?: LapseActivity;
    selectedActivity?: Activity;

}

export class GetLapActivities {
    static readonly type = '[LapActivities] Get LapActivities';
}

@State< LapseActivityModel >({
    name: 'lapseactivities',
    defaults: {
        lapses: {
            lapse1: [],
            lapse2: [],
            lapse3: [],
        },
        selectedActivity: {
            id: '',
            name: '',
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
            status: '',
        }
    }
})
export class LapseActivityState implements NgxsOnInit {

    @Selector()
    static lapses( state: LapseActivityModel ): LapseActivity | null {
        return state.lapses;
    }

    @Selector()
    static selectedActivity( state: LapseActivityModel ): Activity | null {
        return state.selectedActivity;
    }

    ngxsOnInit(ctx: StateContext<LapseActivityModel>): void {
        ctx.dispatch( new GetLapActivities() );

    }

    constructor(
        private lapseActivities: LapseActivitiesService
    ) {}

    @Action( GetLapActivities )
    getLapActivities( ctx: StateContext<LapseActivityModel> ) {
        this.lapseActivities.getLapseActivities().subscribe( response => {
            if ( response ) {
                ctx.setState(patch({
                    ...ctx.getState(),
                    lapses: response
                 } ));
            }
        } );
    }
}
