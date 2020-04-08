import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { LapseActivity } from '../models/lapse-activities.model';
import { LapseActivitiesService } from '../services/lapse-activities.service';

export class GetLapActivities {
    static readonly type = '[LapActivities] Get LapActivities';
}

@State< LapseActivity >({
    name: 'lapseactivities',
    defaults: {
        lapse1: [],
        lapse2: [],
        lapse3: []
    }
})
export class LapseActivityState implements NgxsOnInit {

    @Selector()
    static lapseActivities( state: LapseActivity ): LapseActivity | null {
        return state;
    }

    ngxsOnInit(ctx: StateContext<LapseActivity>): void {
        ctx.dispatch( new GetLapActivities() );
    }

    constructor(
        private lapseActivities: LapseActivitiesService
    ) {}

    @Action( GetLapActivities )
    getLapActivities( ctx: StateContext<LapseActivity> ) {

        this.lapseActivities.getLapseActivities().subscribe( response => {

            if ( response ) {
                ctx.setState( response );
            }

        } );
    }
}
