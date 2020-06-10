import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { LearningState, SetLearningTwo } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';

@Component({
  selector: 'app-secondary-form',
  templateUrl: './secondary-form.component.html',
  styles: []
})
export class SecondaryFormComponent implements OnInit, OnDestroy {

  @Select(LearningState.learning) data$: Observable<Learning>;
  subscription: Subscription;

  form: FormGroup = new FormGroup({
    secondaryTitle: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    secondaryDescription: new FormControl('', [Validators.required, Validators.maxLength(4970)])
  });

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.data$.subscribe( response => {
      this.form.patchValue(response);
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    this.store.dispatch( new SetLearningTwo( this.form.value ) );
  }
}
