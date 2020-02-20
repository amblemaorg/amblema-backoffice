import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WebHomeState, SetSlider, UpdateSlider } from 'src/app/store/web-home.action';
import { Observable, Subscription } from 'rxjs';
import { WebHome, Slider } from 'src/app/models/web/web-home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select( WebHomeState.webHome ) data$: Observable<WebHome>;
  subscription: Subscription;

  sliders : Slider[];

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.slider; // <-- Get sliders, show on the table
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRegisterSlider( slider: Slider ) {
    this.store.dispatch( new SetSlider( slider ) );
  }

  onEditSlider(slider: any []) {
    this.store.dispatch( new UpdateSlider( slider[0], slider[1] ) );
  }
}