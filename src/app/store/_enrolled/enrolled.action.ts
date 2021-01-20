import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { GeneralEnrolled } from 'src/app/_models/_enrolled/general-enrolled.model';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { patch, removeItem, append } from '@ngxs/store/operators';
import { EnrolledSchool } from 'src/app/_models/_enrolled/enrolled-school.model';
import { Injectable } from '@angular/core';

export class GetGeneralEnrolled {
  static readonly type = '[GeneralEnrolled] Get General Enrolled';
}

export class RemoveEnrolledShool {
  static readonly type = '[GeneralEnrolled] Remove Enrolled Schol';
  constructor(public payload: string) {}
}

export class SetEnrolledSchool {
  static readonly type = '[GeneralEnrolled] Set Enrolled School';
  constructor(public payload: string) {}
}

@State<GeneralEnrolled>({
  name: 'generalenrolled',
  defaults: {
    enrolledSchools: [],
    availableSchools: [],
  },
})
@Injectable()
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

  @Action(SetEnrolledSchool)
  setEnrolledSchool(
    ctx: StateContext<GeneralEnrolled>,
    action: SetEnrolledSchool
  ) {
    // -- Stack ---
    let wichSchool: EnrolledSchool;

    ctx.getState().availableSchools.forEach((response) => {
      if (response.projectId === action.payload) { wichSchool = response; }
    });

    ctx.setState(
      patch({
        ...ctx.getState(),
        availableSchools: removeItem<EnrolledSchool>(
          (item) => item.projectId === action.payload
        ),
      })
    );


    // -- Set item --
    ctx.setState(
      patch({
        ...ctx.getState(),
        enrolledSchools: append([wichSchool]),
      })
    );
  }

  @Action(RemoveEnrolledShool)
  removeEnrolledSchool(
    ctx: StateContext<GeneralEnrolled>,
    action: RemoveEnrolledShool
  ) {
    // -- Stack ---
    let wichSchool: EnrolledSchool;

    ctx.getState().enrolledSchools.forEach((response) => {
      if (response.projectId === action.payload) { wichSchool = response; }
    });

    ctx.setState(
      patch({
        ...ctx.getState(),
        availableSchools: append([wichSchool]),
      })
    );

    // -- Now can remove item --
    ctx.setState(
      patch({
        ...ctx.getState(),
        enrolledSchools: removeItem<EnrolledSchool>(
          (item) => action.payload === item.projectId
        ),
      })
    );
  }
}
