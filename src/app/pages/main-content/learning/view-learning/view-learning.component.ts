import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Learning } from 'src/app/models/learning.model';
import { Select } from '@ngxs/store';
import { LearningState } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-view-learning',
  templateUrl: './view-learning.component.html',
  styles: []
})
export class ViewLearningComponent implements OnInit, OnDestroy {
  @Input() learning: Learning;
  data:Learning;
  @Select( LearningState.learning ) learning$: Observable<Learning>;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.learning$.subscribe( response => {
      this.data = response;
    } )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
