import { State, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { LapseActivity } from '../models/lapse-activities.model';
import { LapseActivitiesService } from '../services/lapse-activities.service';

export class GetLapActivities {
    static readonly type = '[LapActivities] Get LapActivities';
}

@State< LapseActivity[] >({
    name: 'lapseactivities',
    defaults: []
})
export class LapseActivityState implements NgxsOnInit {
    ngxsOnInit(ctx: StateContext<LapseActivity>): void {
        ctx.dispatch( new GetLapActivities() );
    }

    constructor(
        private lapseActivities: LapseActivitiesService
    ) {}

    @Action( GetLapActivities )
    getLapActivities( ctx: StateContext<LapseActivity> ) {

        this.lapseActivities.getLapseActivities().subscribe( response => {
            console.log(response);
        } );
    }
}
