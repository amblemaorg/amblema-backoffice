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
  SetWebHome
} from 'src/app/store/web-content/web-home.action';
import { Observable, Subscription } from 'rxjs';
import { WebHome } from 'src/app/_models/web/web-home.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Slider } from 'src/app/_models/web/slider.model';
import { Testimonial } from 'src/app/_models/web/testimonial.model';
import { WebHomeService } from 'src/app/services/web-content/web-home.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select(WebHomeState.webHome) data$: Observable<WebHome>;
  subscription: Subscription;

  sliders: Slider[];
  showProgress = false;
  testimonials: Testimonial[];

  // Text area content
  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor(
    private toastr: CustomToastrService,
    private webHomeService: WebHomeService,
    private store: Store) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe(response => {
      this.sliders = response.slider; // <-- Get sliders, show on the table
      this.testimonials = response.testimonials; // <-- Get testimonials show on the table
      if (response.aboutUsText) {
        this.form.controls.aboutUsText.setValue(response.aboutUsText);
      }
      if (response.environmentText) {
        this.form.controls.environmentText.setValue(response.environmentText);
      }
      if (response.readingText) {
        this.form.controls.readingText.setValue(response.readingText);
      }
      if (response.mathText) {
        this.form.controls.mathText.setValue(response.mathText);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- Testimonials slider --

  onRegisterSlider(slider: Slider) {
    this.store.dispatch(new SetSliderWebHome(slider));
  }

  onEditSlider(slider: any[]) {
    this.store.dispatch(new UpdateSliderWebHome(slider[0], slider[1]));
  }

  onDeleteSlider(slider: Slider) {
    this.store.dispatch(new DeleteSliderWebHome(slider));
  }

  // -- Testimonials events --

  onRegisterTestimonial(testimonial: Testimonial) {
    this.store.dispatch(new SetTestimonialWebHome(testimonial));
  }

  onEditTestimonial(testimonial: any[]) {
    this.store.dispatch(new UpdateTestimonialWebHome(testimonial[0], testimonial[1]));
  }

  onDeleteTestimonial(testimonial: Testimonial) {
    this.store.dispatch(new DeleteTestimonialWebHome(testimonial));
  }

  // Save

  onSaveWebHome() {

    console.log("se esta disparando")
    this.subscription = this.store.dispatch(new SetWebHome(this.form.value)).subscribe(response => {

      this.showProgress = true;
      this.subscription = this.webHomeService.setContentWebHome({ homePage: response.webhome }).subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Response:
            setTimeout(() => {
              this.showProgress = false;
            }, 2500);

            this.toastr.updateSuccess('Actualizacion', 'Contenido de la página de inicio guardado.');
            break;
        }
      }, (err: any) => {
        console.log(err)
        this.showProgress = false;
        this.toastr.error('Error', 'No se ha completado el registro.');
      });
    });
  }
}
