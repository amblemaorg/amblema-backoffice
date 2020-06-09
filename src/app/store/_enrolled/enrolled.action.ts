import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { GeneralEnrolled } from 'src/app/models/_enrolled/general-enrolled.model';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { patch } from '@ngxs/store/operators';
import { EnrolledSchool } from 'src/app/models/_enrolled/enrolled-school.model';

export class GetGeneralEnrolled {
  static readonly type = '[GeneralEnrolled] Get General Enrolled';
}

@State<GeneralEnrolled>({
  name: 'generalenrolled',
  defaults: {
    enrolledSchools: [],
    availableSchools: [],
  },
})
export class GeneralEnrolledState implements NgxsOnInit {
  @Selector()
  static availableSchools(state: GeneralEnrolled): EnrolledSchool[] | null {
    return state.availableSchools;
  }

  @Selector()
  static enrolledSchools(state: GeneralEnrolled): EnrolledSchool[] | null {
    return state.enrolledSchools;
  }

  constructor(private enrolledServices: EnrolledService) {}

  ngxsOnInit(ctx: StateContext<GeneralEnrolled>): void {
    ctx.dispatch(new GetGeneralEnrolled());
  }

  @Action(GetGeneralEnrolled)
  getGeneralEnrolled(ctx: StateContext<GeneralEnrolled>) {
    this.enrolledServices.getEnrollment().subscribe((response) => {
      ctx.setState(
        patch({
          ...ctx.getState(),
          enrolledSchools: response.enrolledSchools,
          availableSchools: response.availableSchools,
        })
      );
    });
  }
}
