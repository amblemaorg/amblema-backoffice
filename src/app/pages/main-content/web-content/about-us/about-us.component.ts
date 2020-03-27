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
  SetWebAbout} from 'src/app/store/web-content/web-about.action';
import { Observable, Subscription } from 'rxjs';
import { WebAbout, Award } from 'src/app/models/web/web-about.model';
import { Slider } from 'src/app/models/web/slider.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  @Select( WebAboutState.webAbout ) data$: Observable<WebAbout>;
  subscription: Subscription;

  sliders: Slider[];
  awards: Award[];

  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor( private store: Store ) { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      this.sliders = response.aboutUsPage.slider;
      this.awards = response.aboutUsPage.awards;

      if ( response.aboutUsPage.aboutUsText ) {
        this.form.controls.aboutUsText.setValue( response.aboutUsPage.aboutUsText );
      }
      if ( response.aboutUsPage.environmentText ) {
        this.form.controls.environmentText.setValue( response.aboutUsPage.environmentText );
      }
      if ( response.aboutUsPage.readingText ) {
        this.form.controls.readingText.setValue( response.aboutUsPage.readingText );
      }
      if ( response.aboutUsPage.mathText ) {
        this.form.controls.mathText.setValue( response.aboutUsPage.mathText );
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  // -- CRUD Sliders --

  onRegisterSlider( slider: Slider ) {
    this.store.dispatch( new SetSliderWebAbout( slider ) );
  }

  onEditSlider(slider: any []) {
    this.store.dispatch( new UpdateSliderWebAbout( slider[0], slider[1] ) );
  }

  onDeleteSlider( slider: Slider ) {
    this.store.dispatch( new DeleteSliderWebAbout( slider ) );
  }

  // -- CRUD Awards --

  onRegisterAward( award: Award ) {
    this.store.dispatch( new SetAwardWebAbout(award) );
  }

  onEditAward( award: any []) {
    this.store.dispatch( new UpdateAwardWebAbout( award[0], award[1] ) );
  }

  onDeleteAward( award: Award ) {
    this.store.dispatch( new DeleteAwardWebAbout(award) );
  }

  // -- Save --

  onSaveWebAbout() {
    this.store.dispatch( new SetWebAbout( { aboutUsPage: this.form.value } ) );
  }

}
