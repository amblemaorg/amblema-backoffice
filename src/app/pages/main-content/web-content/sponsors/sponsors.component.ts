import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Testimonial } from 'src/app/models/web/testimonial.model';
import {
  WebSponsorState,
  SetTestimonialWebSponsor,
  UpdateTestimonialWebSponsor,
  DeleteTestimonialWebSponsor,
  SetWebSponsor
} from 'src/app/store/web-content/web-sponsor.action';
import { Observable, Subscription } from 'rxjs';
import { WebSponsor } from 'src/app/models/web/web-sponsor.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { WebSponsorService } from 'src/app/services/web-content/web-sponsor.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  @Select(WebSponsorState.webSponsor) data$: Observable<WebSponsor>;
  subscription: Subscription;

  testimonials: Testimonial[];
  submitted = false;
  showProgress = false;

  steps = new FormArray([]);

  formSponsor: FormGroup = new FormGroup({
    backgroundImage: new FormControl('', [Validators.required]),
  });

  constructor(
    private webSponsorService: WebSponsorService,
    private toastr: CustomToastrService,
    private store: Store) { }

  ngOnInit() {

    for (let index = 0; index < 7; index++) {
      this.steps.push(new FormControl(''));
    }

    this.formSponsor.addControl('steps', this.steps);

    this.subscription = this.data$.subscribe(response => {
      this.testimonials = response.sponsorPage.testimonials; // Get testimonials array

      /**
       * This code is to void reset the input fields background
       */
      const imageBackUp = this.formSponsor.controls.backgroundImage.value ?
        this.formSponsor.controls.backgroundImage.value : null;

      this.formSponsor.patchValue(response.sponsorPage);

      if (imageBackUp) {
        this.formSponsor.controls.backgroundImage.setValue(imageBackUp);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- Testimonials events --

  onRegisterTestimonial(testimonial: Testimonial) {
    this.store.dispatch(new SetTestimonialWebSponsor(testimonial));
  }

  onEditTestimonial(testimonial: any[]) {
    this.store.dispatch(new UpdateTestimonialWebSponsor(testimonial[0], testimonial[1]));
  }

  onDeleteTestimonial(testimonial: Testimonial) {
    this.store.dispatch(new DeleteTestimonialWebSponsor(testimonial));
  }

  // Save

  onSave() {
    this.subscription = this.store.dispatch(new SetWebSponsor({ sponsorPage: this.formSponsor.value })).subscribe((response: any) => {
      this.showProgress = true;
      this.subscription = this.webSponsorService.setContentWebSponsor(response.websponsor).subscribe((response: HttpEvent<any>) => {

        switch (response.type) {
          case HttpEventType.Response:
            setTimeout(() => {
              this.showProgress = false;
            }, 2500);
            this.toastr.updateSuccess('Actualizacion', 'Contenido de la página padrinos guardado.');
            break;
        }
      }, (err: any) => {
        this.showProgress = false;
        this.toastr.error('Error', 'No se ha completado el registro.');
      });
    });
  }
}
