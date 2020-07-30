import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ActivityStrategyState,
  AddSliderEnviromentToActivityStrategy,
  UpdateSliderEnviromentToActivityStrategy,
  DeleteSliderEnviromentToActivityStrategy,
  AddSliderReadingToActivityStrategy,
  UpdateSliderReadingToActivityStrategy,
  DeleteSliderReadingToActivityStrategy,
  AddSliderMathToActivityStrategy,
  UpdateSliderMathToActivityStrategy,
  DeleteSliderMathToActivityStrategy
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

  /**
   * =====================
   * Enviroment
   * =====================
   */

  onRegisterSliderEnviroment(event: any) {
    this.store.dispatch(new AddSliderEnviromentToActivityStrategy(event));
  }

  onEditSliderEnviroment(event: any) {
    this.store.dispatch(
      new UpdateSliderEnviromentToActivityStrategy(event[1], event[0])
    );
  }

  onDeleteSliderEnviroment(event: any) {
    this.store.dispatch(new DeleteSliderEnviromentToActivityStrategy(event));
  }

  /**
   * =====================
   * Reading
   * =====================
   */

  onRegisterSliderReading(event: any) {
    this.store.dispatch(new AddSliderReadingToActivityStrategy(event));
  }

  onEditSliderReading(event: any) {
    this.store.dispatch(
      new UpdateSliderReadingToActivityStrategy(event[1], event[0])
    );
  }

  onDeleteSliderReading(event: any) {
    this.store.dispatch(new DeleteSliderReadingToActivityStrategy(event));
  }

  /**
   * =====================
   * Math
   * =====================
   */

  onRegisterSliderMath(event: any) {
    this.store.dispatch(new AddSliderMathToActivityStrategy(event));
  }

  onEditSliderMath(event: any) {
    this.store.dispatch(
      new UpdateSliderMathToActivityStrategy(event[1], event[0])
    );
  }

  onDeleteSliderMath(event: any) {
    this.store.dispatch(new DeleteSliderMathToActivityStrategy(event));
  }
}
