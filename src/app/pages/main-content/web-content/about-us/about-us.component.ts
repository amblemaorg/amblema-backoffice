import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import {
  WebAboutState,
  SetSliderWebAbout,
  UpdateSliderWebAbout,
  DeleteSliderWebAbout,
  SetAwardWebAbout,
  UpdateAwardWebAbout,
  DeleteAwardWebAbout,
  SetWebAbout
} from 'src/app/store/web-content/web-about.action';
import { Observable, Subscription } from 'rxjs';
import { WebAbout, Award } from 'src/app/_models/web/web-about.model';
import { Slider } from 'src/app/_models/web/slider.model';
import { WebAboutService } from 'src/app/services/web-content/web-about.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  @Select(WebAboutState.webAbout) data$: Observable<WebAbout>;
  subscription: Subscription;

  showProgress = false;
  sliders: Slider[];
  awards: Award[];

  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor(
    private webAboutService: WebAboutService,
    private toastr: CustomToastrService,
    private store: Store) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe(response => {
      this.sliders = response.aboutUsPage.slider;
      this.awards = response.aboutUsPage.awards;

      this.form.controls.aboutUsText.setValue(this.form.controls.aboutUsText.value ? this.form.controls.aboutUsText.value : response.aboutUsPage.aboutUsText);
      this.form.controls.environmentText.setValue(this.form.controls.environmentText.value ? this.form.controls.environmentText.value : response.aboutUsPage.environmentText);
      this.form.controls.readingText.setValue(this.form.controls.readingText.value ? this.form.controls.readingText.value : response.aboutUsPage.readingText);
      this.form.controls.mathText.setValue(this.form.controls.mathText.value ? this.form.controls.mathText.value : response.aboutUsPage.mathText);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- CRUD Sliders --

  onRegisterSlider(slider: Slider) {
    console.log(`Este es el slider que se esta cargando ${slider}`);
    this.store.dispatch(new SetSliderWebAbout(slider));

  }

  onEditSlider(slider: any[]) {
    this.store.dispatch(new UpdateSliderWebAbout(slider[0], slider[1]));
  }

  onDeleteSlider(slider: Slider) {
    this.store.dispatch(new DeleteSliderWebAbout(slider));
  }

  // -- CRUD Awards --

  onRegisterAward(award: Award) {
    this.store.dispatch(new SetAwardWebAbout(award));
  }

  onEditAward(award: any[]) {
    this.store.dispatch(new UpdateAwardWebAbout(award[0], award[1]));
  }

  onDeleteAward(award: Award) {
    this.store.dispatch(new DeleteAwardWebAbout(award));
  }

  // -- Save --

  onSaveWebAbout() {
    this.store.dispatch(new SetWebAbout({ aboutUsPage: this.form.value })).subscribe((response: any) => {

      this.showProgress = true;

      this.webAboutService.setContentWebAbout(response.webabout).subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Response:
            setTimeout(() => {
              this.showProgress = false;

            }, 2500);
            this.toastr.updateSuccess('Actualizacion', 'Contenido de la página guardado.');
            break;
        }

      }, (err: any) => {
        this.showProgress = false;

        this.toastr.error('Error', 'No se ha completado el registro.');
      });

    });
  }

}
