import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Testimonial } from 'src/app/models/web/testimonial.model';
import { WebSponsorState, SetTestimonialWebSponsor, UpdateTestimonialWebSponsor, DeleteTestimonialWebSponsor, SetWebSponsor } from 'src/app/store/web-sponsor.action';
import { Observable, Subscription } from 'rxjs';
import { WebSponsor } from 'src/app/models/web/web-sponsor.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  @Select( WebSponsorState.webSponsor ) data$ : Observable<WebSponsor>;
  subscription: Subscription;

  testimonials : Testimonial[]; 
  submitted: boolean = false; 

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
      this.testimonials = response.sponsorPage.testimonials; // Get testimonials array
      this.form.patchValue(response.sponsorPage); 
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // -- Testimonials events --

  onRegisterTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new SetTestimonialWebSponsor( testimonial ) );
  }

  onEditTestimonial( testimonial: any []) {
    this.store.dispatch( new UpdateTestimonialWebSponsor( testimonial[0], testimonial[1] ) );
  }

  onDeleteTestimonial( testimonial: Testimonial ) {
    this.store.dispatch( new DeleteTestimonialWebSponsor(testimonial) );
  }

  // Save

  onSave() {
    this.store.dispatch( new SetWebSponsor( { sponsorPage: this.form.value } ) );
  }
}
