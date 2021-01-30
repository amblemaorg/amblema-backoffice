import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  WebCoordinatorState,
  SetTestimonialWebCoordinator,
  UpdateTestimonialWebCoordinator,
  DeleteTestimonialWebCoordinator,
  SetWebCoordinator
} from 'src/app/store/web-content/web-coordinator.action';
import { Observable, Subscription } from 'rxjs';
import { WebCoordinator } from 'src/app/_models/web/web-coordinator.model';
import { Testimonial } from 'src/app/_models/web/testimonial.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { WebCoordinatorService } from 'src/app/services/web-content/web-coordinator.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-coordinators',
  templateUrl: './coordinators.component.html',
  styleUrls: ['./coordinators.component.scss']
})
export class CoordinatorsComponent implements OnInit, OnDestroy {

  @Select(WebCoordinatorState.webCoordinator) data$: Observable<WebCoordinator>;
  subscription: Subscription;

  testimonials: Testimonial[];
  submitted = false;
  showProgress = false;

  steps = new FormArray([]);
  form: FormGroup = new FormGroup({
    backgroundImage: new FormControl('', [Validators.required]),
  });

  constructor(
    private taostr: CustomToastrService,
    private webCoordinatorService: WebCoordinatorService,
    private store: Store) { }

  ngOnInit() {

    for (let index = 0; index < 7; index++) {
      this.steps.push(new FormControl(''));
    }

    this.form.addControl('steps', this.steps);
    this.subscription = this.data$.subscribe(response => {

      this.testimonials = response.coordinatorPage.testimonials;

      /**
       * This code is to void reset the input fields background
       */

      const imageBackUp = this.form.controls.backgroundImage.value ?
        this.form.controls.backgroundImage.value : null;


      const allEmpty = JSON.stringify(this.form.controls.steps.value);

      if (allEmpty === '["","","","","","",""]') {

        this.form.patchValue(response.coordinatorPage);

      }
      if (imageBackUp) {
        this.form.controls.backgroundImage.setValue(imageBackUp);
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
    this.store.dispatch(new SetTestimonialWebCoordinator(testimonial));
  }

  onEditTestimonial(testimonial: any[]) {
    this.store.dispatch(new UpdateTestimonialWebCoordinator(testimonial[0], testimonial[1]));
  }

  onDeleteTestimonial(testimonial: Testimonial) {
    this.store.dispatch(new DeleteTestimonialWebCoordinator(testimonial));
  }

  // Save

  onSave() {

    this.subscription = this.store.dispatch(new SetWebCoordinator({ coordinatorPage: this.form.value })).subscribe((response: any) => {
      this.showProgress = true;

      this.subscription = this.webCoordinatorService.setContentWebCoordinator(
        response.webcoordinator).subscribe((event: HttpEvent<any>) => {

          switch (event.type) {
            case HttpEventType.Response:
              setTimeout(() => {
                this.showProgress = false;
              }, 2500);
              this.taostr.updateSuccess('Actualizacion', 'Contenido de la página coordinadores guardado.');
              break;
          }

        }, (err: any) => {
          this.showProgress = false;
          this.taostr.error('Error', 'No se ha completado el registro.');
        });
    });
  }

}
