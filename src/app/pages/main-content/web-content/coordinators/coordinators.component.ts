import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  WebCoordinatorState,
  SetTestimonialWebCoordinator,
  UpdateTestimonialWebCoordinator,
  DeleteTestimonialWebCoordinator,
  SetWebCoordinator } from 'src/app/store/web-coordinator.action';
import { Observable, Subscription } from 'rxjs';
import { WebCoordinator } from 'src/app/models/web/web-coordinator.model';
import { Testimonial } from 'src/app/models/web/testimonial.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-coordinators',
  templateUrl: './coordinators.component.html',
  styleUrls: ['./coordinators.component.scss']
})
export class CoordinatorsComponent implements OnInit, OnDestroy {

  @Select( WebCoordinatorState.webCoordinator ) data$: Observable<WebCoordinator>;
  subscription: Subscription;

  testimonials: Testimonial[];
  submitted = false;

  steps = new FormArray([]);
  form: FormGroup = new FormGroup({
    backgroundImage: new FormControl('', [Validators.required]),
  });

  constructor( private store: Store ) { }

  ngOnInit() {

    for (let index = 0; index < 7; index++) {
      this.steps.push(new FormControl(''));
    }

    this.form.addControl('steps', this.steps);
    this.subscription = this.data$.subscribe( response => {
      
      this.testimonials = response.coordinatorPage.testimonials;

      /**
       * This code is to void reset the input fields background
       */

      let imageBackUp = this.form.controls['backgroundImage'].value ? 
      this.form.controls['backgroundImage'].value : null; 

      this.form.patchValue(response.coordinatorPage);

      if( imageBackUp ) {
        this.form.controls['backgroundImage'].setValue(imageBackUp);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // -- Testimonials events --

  onRegisterTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new SetTestimonialWebCoordinator( testimonial ) );
  }

  onEditTestimonial( testimonial: any []) {
    this.store.dispatch( new UpdateTestimonialWebCoordinator( testimonial[0], testimonial[1] ) );
  }

  onDeleteTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new DeleteTestimonialWebCoordinator(testimonial) );
  }

  // Save

  onSave() {
    this.store.dispatch( new SetWebCoordinator( { coordinatorPage: this.form.value } ) );
  }

}
