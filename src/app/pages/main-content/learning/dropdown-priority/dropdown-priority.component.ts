import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { LearningState } from 'src/app/store/learning.action';
import { Observable, Subscription } from 'rxjs';
import { Learning } from 'src/app/models/learning.model';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-priority',
  templateUrl: './dropdown-priority.component.html',
  styleUrls: ['./dropdown-priority.component.scss']
})
export class DropdownPriorityComponent implements OnInit, OnDestroy {

  @Select(LearningState.learnings) data$: Observable<Learning[]>;
  @Input() control: AbstractControl | null = new FormControl();
  subscription: Subscription;

  data = [];
  selected: any;

  constructor() { }

  ngOnInit() {

    this.selected = this.control.value === 0 || this.control.value === null 
    ? { id: null, name: 'Ultima position' } : { id: this.control.value, name: (this.control.value).toString() };

    this.subscription = this.data$.subscribe(response => {

      response.forEach((value, key) => {
        this.data.push({ id: key + 1, name: (key + 1).toString() });
      });

      this.data.push({ id: null, name: 'Ultima position' });

    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  itemSelected(event: any) {

    if (event !== undefined) {
      this.selected = event;
      this.control.setValue(this.selected.id ? this.selected.id : null);
    }
  }
}
