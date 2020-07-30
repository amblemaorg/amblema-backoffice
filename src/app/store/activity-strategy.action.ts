import { Slider } from '../_models/web/slider.model';
import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { ActivityStrategyService } from '../services/activity-strategy.service';
import { Subscription } from 'rxjs';
import { patch, append } from '@ngxs/store/operators';

export interface ModelActivityStrategy {
  environmentActivities: Slider[];
  readingActivities: Slider[];
  mathActivities: Slider[];
}

// -- Actions --

export class GetActivityStrategy {
  static readonly type = '[ActivityStrategy] Get Activity Strategy';
}

export class AddSliderEnviromentToActivityStrategy {
  static readonly type = '[ActivityStrategy] Add Slider Enviroment To Activity Strategy';
  constructor( public payload: Slider ) {}
}

export class AddSliderReadingToActivityStrategy {
  static readonly type = '[ActivityStrategy] Add Slider Reading To Activity Strategy';
}


export class AddSliderMathToActivityStrategy {
  static readonly type = '[ActivityStrategy] Add Slider Math To Activity Strategy';
}

export class UpdateSliderToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Update Slider To Activity Strategy';
}

export class DeleteSliderToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Delete Slider To Activity Strategy';
}

@State<ModelActivityStrategy>({
  name: 'activitystrategy',
  defaults: {
    environmentActivities: [],
    readingActivities: [],
    mathActivities: [],
  },
})
export class ActivityStrategyState implements NgxsOnInit {
  subscription: Subscription;

  @Selector()
  static activityStrategy(
    state: ModelActivityStrategy
  ): ModelActivityStrategy | null {
    return state;
  }

  @Selector()
  static slidereReadingActivities(
    state: ModelActivityStrategy
  ): Slider[] | null {
    return state.readingActivities;
  }


  @Selector()
  static slidereMathActivities(
    state: ModelActivityStrategy
  ): Slider[] | null {
    return state.mathActivities;
  }

  @Selector()
  static slidereEnvironmentActivities(
    state: ModelActivityStrategy
  ): Slider[] | null {
    return state.environmentActivities;
  }

  constructor(private activityStrategyService: ActivityStrategyService) {}

  ngxsOnInit(ctx: StateContext<ModelActivityStrategy>): void {
    ctx.dispatch(new GetActivityStrategy());
  }

  @Action(GetActivityStrategy)
  getActivityStrategy(ctx: StateContext<ModelActivityStrategy>) {
    this.subscription = this.activityStrategyService
      .getActivityStrategy()
      .subscribe((response) => {
        ctx.setState(response);
      });
  }

  @Action(AddSliderEnviromentToActivityStrategy)
  addSliderEnviromentToActivityStrategy(ctx: StateContext<ModelActivityStrategy>, action: AddSliderEnviromentToActivityStrategy) {
    ctx.setState( patch({
      ...ctx.getState(),
      environmentActivities: append([ action.payload ])
    }) );
  }
}
