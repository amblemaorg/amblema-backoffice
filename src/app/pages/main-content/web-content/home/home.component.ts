import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  WebHomeState,
  SetSliderWebHome,
  UpdateSliderWebHome,
  DeleteSliderWebHome,
  SetTestimonialWebHome,
  UpdateTestimonialWebHome,
  DeleteTestimonialWebHome } from 'src/app/store/web-home.action';
import { Observable, Subscription } from 'rxjs';
import { WebHome, Slider, Testimonial } from 'src/app/models/web/web-home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select( WebHomeState.webHome ) data$: Observable<WebHome>;
  subscription: Subscription;

  sliders: Slider[];
  testimonials: Testimonial[];

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.slider; // <-- Get sliders, show on the table
      this.testimonials = response.testimonials; // <-- Get testimonials show on the table
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRegisterSlider( slider: Slider ) {
    this.store.dispatch( new SetSliderWebHome( slider ) );
  }

  onEditSlider(slider: any []) {
    this.store.dispatch( new UpdateSliderWebHome( slider[0], slider[1] ) );
  }

  onDeleteSlider( slider: Slider ) {
    this.store.dispatch( new DeleteSliderWebHome( slider ) );
  }

  onRegisterTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new SetTestimonialWebHome( testimonial ) );
  }

  onEditTestimonial( testimonial: any []) {
    this.store.dispatch( new UpdateTestimonialWebHome( testimonial[0], testimonial[1] ) );
  }

  onDeleteTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new DeleteTestimonialWebHome(testimonial) );
  }

  // Save 

  onSaveWebHome() {
    
  }
}
