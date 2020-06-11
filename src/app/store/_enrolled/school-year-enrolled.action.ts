
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { patch } from '@ngxs/store/operators';
import { STATUS } from 'src/app/helpers/text-content/status';

class SchoolYearEnrolledModel {
    schoolYears: SchoolYearEnrolled[];
}

export class GetSchoolYearsEnrolled {
    static readonly type = '[SchoolYearsEnrolled] Get All School Years';
}

@State<SchoolYearEnrolledModel>({
    name: 'schoolyearenrolled',
    defaults: {
        schoolYears : []
    }
})
export class SchoolYearEnrolledState implements NgxsOnInit {

    @Selector()
    static schoolYearsEnrolled(state: SchoolYearEnrolledModel): SchoolYearEnrolled[] | null {
        return state.schoolYears;
    }

    @Selector()
    static schoolYearActive(state: SchoolYearEnrolledModel): SchoolYearEnrolled | null {

        let schoolYearActive: SchoolYearEnrolled;

        state.schoolYears.forEach( response => {

            if ( response.status === STATUS.ACTIVE.CODE ) {
                schoolYearActive = response;
            }

        } );

        return schoolYearActive;
    }

    constructor(
        private enrolledService: EnrolledService
    ) {}

    ngxsOnInit(ctx: StateContext<SchoolYearEnrolledModel>): void {
        ctx.dispatch( new GetSchoolYearsEnrolled() );
    }


    @Action(GetSchoolYearsEnrolled)
    getSchoolYearsEnrolled(ctx: StateContext<SchoolYearEnrolledModel>) {
        this.enrolledService.getSchoolYears().subscribe( response => {

            ctx.setState( patch( {
                schoolYears: response
            }));
        });
    }


}
