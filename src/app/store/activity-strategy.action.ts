import { Slider } from '../_models/web/slider.model';
import { State } from '@ngxs/store';

export interface ModelActivityStrategy {
  environmentActivities: Slider[];
  readingActivities: Slider[];
  mathActivities: Slider[];
}

// -- Actions --

export class GetActivityStrategy {
  static readonly type = '[ActivityStrategy] Get Activity Strategy';
}

export class AddSliderToActivityStrategy {
  static readonly type = '[ActivityStrategy] Add Slider To Activity Strategy';
}

export class UpdateSliderToActivityStrategy {
  static readonly type =
    '[ActivityStrategy] Update Slider To Activity Strategy';
}

export class DeleteSliderToActivityStrategy {
  static readonly type = '[ActivityStrategy] Delete Slider To Activity Strategy';
}

@State<ModelActivityStrategy>({
  name: 'activitystrategy',
  defaults: {
    environmentActivities: [],
    readingActivities: [],
    mathActivities: [],
  },
})
export class StateActivityStrategy {}
