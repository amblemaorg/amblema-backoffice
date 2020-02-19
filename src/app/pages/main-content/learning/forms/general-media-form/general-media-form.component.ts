import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LearningState, SetLearningOne, SetVideos } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';

@Component({
  selector: 'app-general-media-form',
  templateUrl: './general-media-form.component.html',
  styles: []
})
export class GeneralMediaFormComponent implements OnInit, OnDestroy {

  @Select( LearningState.learning ) data$: Observable<Learning>;
  subscription: Subscription;

  learning: Learning;

  constructor( private store: Store ) {}

  ngOnInit(): void {
    this.subscription = this.data$.subscribe( response => {
      this.learning = Object.assign([], this.learning);
      this.learning = response; // <-- Get data secondary form
      console.log('+++++++++++++++++');
      console.log( this.learning );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSaveStepTwo() {
    this.store.dispatch(new SetVideos( this.learning.videos ));
  }

  getVideos(event: any) {
    this.learning = Object.assign([], this.learning);
    this.learning.videos = event;
  }
}
