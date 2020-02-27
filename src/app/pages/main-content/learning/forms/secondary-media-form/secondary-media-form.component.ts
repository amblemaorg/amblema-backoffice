import { Component, OnInit, OnDestroy } from '@angular/core';
import { Slider } from 'src/app/models/web/slider.model';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetImage, DeleteImage, UpdateImage } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';

@Component({
  selector: 'app-secondary-media-form',
  templateUrl: './secondary-media-form.component.html',
  styles: []
})
export class SecondaryMediaFormComponent implements OnInit, OnDestroy {

  @Select(LearningState.learning) data$: Observable<Learning>;
  subscription: Subscription;

  sliders: Slider[];

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.images;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  // -- Action's Slider --

  onDeleteSlider( slider: Slider ): void {
    this.store.dispatch( new DeleteImage( slider ) );
  }

  onEditSlider(sliders: Slider[]): void {
    this.store.dispatch( new UpdateImage( sliders[0], sliders[1] ) );
  }

  onRegisterSlider(slider: Slider): void {
    this.store.dispatch( new SetImage( slider ));
  }

}
