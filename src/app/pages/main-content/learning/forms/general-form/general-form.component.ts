import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AbtractStepForm } from '../abstract.step.form';
import { Store, Select } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { LearningState, SetLearningOne } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';
import { ACTION } from 'src/app/helpers/text-content/text-crud';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styles: []
})
export class GeneralFormComponent extends AbtractStepForm implements OnInit, OnDestroy, OnChanges {

  @Select(LearningState.learning) data$: Observable<Learning>;
  subscription: Subscription;

  submitted = false;

  constructor(
    private store: Store) {
    super();
  }

  ngOnInit(): void {

    // Add new controls
    this.form.addControl('duration', new FormControl(' ', [Validators.required]));
    this.form.addControl('point', new FormControl('', [Validators.required]));

    this.subscription = this.data$.subscribe(response => {

      if (response !== null) {
        this.form.patchValue(response);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {

    this.subscription = this.data$.subscribe(response => {
      if (this.MODE === ACTION.CREATE) {
        if (response !== null) {
          this.form.patchValue(response);
        }
      } else {

      }
    });
  }

  sendStepOne() {
    this.store.dispatch(new SetLearningOne(this.form.value));
  }
}
