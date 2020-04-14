import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { LapseActivity, Activity, Lapse } from '../models/lapse-activities.model';
import { LapseActivitiesService } from '../services/lapse-activities.service';
import { patch, updateItem, append, removeItem } from '@ngxs/store/operators';

export interface LapseActivityModel {
    lapses?: LapseActivity;
    selectedActivity?: any;

}

export class GetLapActivities {
    static readonly type = '[LapActivities] Get LapActivities';
}

export class UpdateStatusLapseActivity {
    static readonly type = '[LapActivities] Get Lapse Activity';
    constructor(
            public newLapseActivity: Lapse,
            public lapse: string ) {}
}

export class AddLapseActivity {
    static readonly type = '[Activity] Add LapseActivity';
    constructor(
        public payload: Lapse,
        public lapse: string) {}
}

export class SelectActivity {
    static readonly type = '[Activity] Select Activity';
    constructor(
        public payload: Activity
    ) {}
}

export class DeleteLapseActivity {
    static readonly type = '[Activity] Delete Activity';
    constructor(
        public id: string, 
        public lapse: string
    ) {}
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

    @Action( AddLapseActivity )
    addLapseActivity(ctx: StateContext<LapseActivityModel>, action: AddLapseActivity ) {

        if ( action.lapse === '1' ) {
            ctx.setState( patch({
                ...ctx.getState(),
                lapses: patch({
                    ...ctx.getState().lapses,
                    lapse1: append([action.payload])
                })
            }) );
        }

    }

    @Action( UpdateStatusLapseActivity )
    updateStatusLapseActivity(ctx: StateContext<LapseActivityModel>, action: UpdateStatusLapseActivity ) {
        if ( action.lapse === '1' ) {
            ctx.setState( patch({
                ...ctx.getState(),
                lapses: patch({
                    ...ctx.getState().lapses,
                    lapse1: updateItem<Lapse>( lapse => lapse.id === action.newLapseActivity.id, action.newLapseActivity )
                })
            }) );
        }
    }


    @Action( DeleteLapseActivity )
    DeleteLapseActivity(ctx: StateContext<LapseActivityModel>, action: DeleteLapseActivity ) {
        if ( action.lapse === '1' ) {
            ctx.setState( patch({
                ...ctx.getState(),
                lapses: patch({
                    ...ctx.getState().lapses,
                    lapse1: removeItem<Lapse>( lapse => lapse.id === action.id )
                })
            }) );
        }
    }

    @Action( SelectActivity )
    selectActivity( ctx: StateContext<LapseActivityModel>, action: SelectActivity ) {

        ctx.setState( patch({
            ...ctx.getState(),
            selectedActivity: action.payload
        }) );

    }
}
