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

  async ngOnInit() {
    this.subscription = this.data$.subscribe(response => {
      this.sliders = response.slider; // <-- Get sliders, show on the table
      this.testimonials = response.testimonials; // <-- Get testimonials show on the table
      this.form.controls.aboutUsText.setValue(this.form.controls.aboutUsText.value ? this.form.controls.aboutUsText.value : response.aboutUsText);
      this.form.controls.environmentText.setValue(this.form.controls.environmentText.value ? this.form.controls.environmentText.value : response.environmentText);
      this.form.controls.readingText.setValue(this.form.controls.readingText.value ? this.form.controls.readingText.value : response.readingText);
      this.form.controls.mathText.setValue(this.form.controls.mathText.value ? this.form.controls.mathText.value : response.mathText); 
    
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
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
        this.showProgress = false;
        this.toastr.error('Error', 'No se ha completado el registro.');
      });
    });
  }
}
