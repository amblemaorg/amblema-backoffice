import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Topic } from "src/app/models/environmental-project.model";
import {
  AddTopic,
  EnvironmentalProjectState,
} from "src/app/store/environmental-project.action";
import { Observable, Subscription } from "rxjs";
import { take } from 'rxjs/operators';

@Component({
  selector: "app-topics-form",
  templateUrl: "./topics-form.component.html",
  styleUrls: ["./topics-form.component.scss"],
})
export class TopicsFormComponent implements OnInit, OnDestroy {
  @Select(EnvironmentalProjectState.topics) topics$: Observable<Topic[]>;
  subscription: Subscription;

  value: Topic;

  constructor(private store: Store) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    if( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  addTopic() {
      this.subscription = this.topics$.pipe(take(1)).subscribe((response) => {
      this.store.dispatch(
        new AddTopic({
          name: "",
          objectives: [],
          strategies: [],
          contents: [],
          levels: [],
        })
      );
    });
  }
}
