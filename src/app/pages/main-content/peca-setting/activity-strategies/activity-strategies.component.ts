import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ActivityStrategyState,
  AddSliderEnviromentToActivityStrategy,
} from 'src/app/store/activity-strategy.action';
import { Observable } from 'rxjs';
import { Slider } from 'src/app/_models/web/slider.model';

@Component({
  selector: 'app-activity-strategies',
  templateUrl: './activity-strategies.component.html',
  styles: [],
})
export class ActivityStrategiesComponent implements OnInit {
  @Select(ActivityStrategyState.slidereEnvironmentActivities)
  $sliderEnviroment: Observable<Slider[]>;
  @Select(ActivityStrategyState.slidereMathActivities) $sliderMath: Observable<
    Slider[]
  >;
  @Select(ActivityStrategyState.slidereReadingActivities)
  $sliderReading: Observable<Slider[]>;

  constructor(private store: Store) {}

  ngOnInit() {}

  onRegisterSliderEnviroment(event: any) {
    this.store.dispatch(new AddSliderEnviromentToActivityStrategy(event));
  }


}
