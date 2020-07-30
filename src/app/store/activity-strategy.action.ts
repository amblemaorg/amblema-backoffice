import { Slider } from '../_models/web/slider.model';
import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { ActivityStrategyService } from '../services/activity-strategy.service';
import { Subscription } from 'rxjs';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';

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
  static readonly type =
    '[ActivityStrategy] Add Slider Enviroment To Activity Strategy';
  constructor(public payload: Slider) {}
}

export class UpdateSliderEnviromentToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Update Slider Enviroment To Activity Strategy';
  constructor(public newSlider: Slider, public oldSlider: Slider) {}
}

export class DeleteSliderEnviromentToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Delete Slider Enviroment To Activity Strategy';
  constructor(public payload: Slider) {}
}

export class AddSliderReadingToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Add Slider Reading To Activity Strategy';
  constructor( public payload: Slider) {

  }
}

export class UpdateSliderReadingToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Update Slider Reading To Activity Strategy';
  constructor(public newSlider: Slider, public oldSlider: Slider) {}
}

export class DeleteSliderReadingToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Delete Slider Reading To Activity Strategy';
  constructor(public payload: Slider) {}
}

export class AddSliderMathToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Add Slider Math To Activity Strategy';

    constructor(public payload: Slider) {}
  }

export class UpdateSliderMathToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Update Slider Math To Activity Strategy';
  constructor(public newSlider: Slider, public oldSlider: Slider) {}
}

export class DeleteSliderMathToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Delete Slider Math To Activity Strategy';
  constructor(public payload: Slider) {}
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
  static slidereMathActivities(state: ModelActivityStrategy): Slider[] | null {
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
  addSliderEnviromentToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: AddSliderEnviromentToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        environmentActivities: append([action.payload]),
      })
    );
  }

  @Action(UpdateSliderEnviromentToActivityStrategy)
  updateSliderEnviromentToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: UpdateSliderEnviromentToActivityStrategy
  ) {

    ctx.setState(
      patch({
        ...ctx.getState(),
        environmentActivities: updateItem<Slider>(
          (item) => item === action.oldSlider,
          action.newSlider
        ),
      })
    );
  }

  @Action(DeleteSliderEnviromentToActivityStrategy)
  deleteSliderEnviromentToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: DeleteSliderEnviromentToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        environmentActivities: removeItem<Slider>(
          (item) => item === action.payload
        ),
      })
    );
  }

  @Action(AddSliderReadingToActivityStrategy)
  addSliderReadingToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: AddSliderReadingToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        readingActivities: append([action.payload]),
      })
    );
  }

  @Action(UpdateSliderReadingToActivityStrategy)
  updateSliderReadingToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: UpdateSliderReadingToActivityStrategy
  ) {

    ctx.setState(
      patch({
        ...ctx.getState(),
        readingActivities: updateItem<Slider>(
          (item) => item === action.oldSlider,
          action.newSlider
        ),
      })
    );
  }

  @Action(DeleteSliderReadingToActivityStrategy)
  deleteSliderReadingToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: DeleteSliderReadingToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        readingActivities: removeItem<Slider>(
          (item) => item === action.payload
        ),
      })
    );
  }

  @Action(AddSliderMathToActivityStrategy)
  addSliderMathToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: AddSliderMathToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        mathActivities: append([action.payload]),
      })
    );
  }

  @Action(UpdateSliderMathToActivityStrategy)
  updateSliderMathToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: UpdateSliderMathToActivityStrategy
  ) {

    ctx.setState(
      patch({
        ...ctx.getState(),
        mathActivities: updateItem<Slider>(
          (item) => item === action.oldSlider,
          action.newSlider
        ),
      })
    );
  }

  @Action(DeleteSliderMathToActivityStrategy)
  deleteSliderMathToActivityStrategy(
    ctx: StateContext<ModelActivityStrategy>,
    action: DeleteSliderMathToActivityStrategy
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        mathActivities: removeItem<Slider>(
          (item) => item === action.payload
        ),
      })
    );
  }
}
