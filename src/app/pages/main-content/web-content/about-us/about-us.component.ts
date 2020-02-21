import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { WebAboutState, SetSliderWebAbout, UpdateSliderWebAbout, DeleteSliderWebAbout } from 'src/app/store/web-about.action';
import { Observable, Subscription } from 'rxjs';
import { AboutUsPage, WebAbout } from 'src/app/models/web/web-about.model';
import { Slider } from 'src/app/models/web/sldier.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  @Select( WebAboutState.webAbout ) data$: Observable<WebAbout>;
  subscription: Subscription;

  sliders: Slider[];


  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor( private store: Store ) { }

  ngOnInit() {

    this.subscription = this.data$.subscribe( response => {

      console.log(response);

    } );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRegisterSlider( slider: Slider ) {
    this.store.dispatch( new SetSliderWebAbout( slider ) );
  }

  onEditSlider(slider: any []) {
    // this.store.dispatch( new UpdateSliderWebAbout( slider[0], slider[1] ) );
  }

  onDeleteSlider( slider: Slider ) {
    // this.store.dispatch( new DeleteSliderWebAbout( slider ) );
  }
}
