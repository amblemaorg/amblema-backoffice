import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WebCoordinatorState, SetTestimonialWebCoordinator, UpdateTestimonialWebCoordinator, DeleteTestimonialWebCoordinator, SetWebCoordinator } from 'src/app/store/web-coordinator.action';
import { Observable, Subscription } from 'rxjs';
import { WebCoordinator } from 'src/app/models/web/web-coordinator.model';
import { Testimonial } from 'src/app/models/web/testimonial.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-coordinators',
  templateUrl: './coordinators.component.html',
  styleUrls: ['./coordinators.component.scss']
})
export class CoordinatorsComponent implements OnInit {

  @Select( WebCoordinatorState.webCoordinator ) data$: Observable<WebCoordinator>;
  subscription : Subscription;

  testimonials : Testimonial[];
  submitted : boolean = false;

  form: FormGroup = new FormGroup({
    backgroundImage: new FormControl('', [Validators.required]),
    steps: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
    ])
  });  

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.testimonials = response.coordinatorPage.testimonials; // Get testimonials array
      this.form.patchValue(response.coordinatorPage); 
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
