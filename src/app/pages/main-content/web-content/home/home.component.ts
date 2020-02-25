import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  WebHomeState,
  SetSliderWebHome,
  UpdateSliderWebHome,
  DeleteSliderWebHome,
  SetTestimonialWebHome,
  UpdateTestimonialWebHome,
  DeleteTestimonialWebHome,
  SetWebHome} from 'src/app/store/web-home.action';
import { Observable, Subscription } from 'rxjs';
import { WebHome } from 'src/app/models/web/web-home.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Slider } from 'src/app/models/web/sldier.model';
import { Testimonial } from 'src/app/models/web/testimonial.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select( WebHomeState.webHome ) data$: Observable<WebHome>;
  subscription: Subscription;

  sliders: Slider[];
  testimonials: Testimonial[];

  // Text area content
  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.slider; // <-- Get sliders, show on the table
      this.testimonials = response.testimonials; // <-- Get testimonials show on the table
      this.form.patchValue( response );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // -- Testimonials slider --

  onRegisterSlider( slider: Slider ) {
    this.store.dispatch( new SetSliderWebHome( slider ) );
  }

  onEditSlider(slider: any []) {
    this.store.dispatch( new UpdateSliderWebHome( slider[0], slider[1] ) );
  }

  onDeleteSlider( slider: Slider ) {
    this.store.dispatch( new DeleteSliderWebHome( slider ) );
  }

  // -- Testimonials events --

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
    this.store.dispatch( new SetWebHome( this.form.value ) );
  }
}
