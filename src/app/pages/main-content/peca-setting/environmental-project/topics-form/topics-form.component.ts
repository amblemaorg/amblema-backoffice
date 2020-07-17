import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Topic } from 'src/app/_models/environmental-project.model';
import {
  AddTopic,
  EnvironmentalProjectState,
  EnvironmentalProjectModel,
} from 'src/app/store/environmental-project.action';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';

@Component({
  selector: 'app-topics-form',
  templateUrl: './topics-form.component.html',
  styleUrls: ['./topics-form.component.scss'],
})
export class TopicsFormComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  @Select(EnvironmentalProjectState.topics) topics$: Observable<Topic[]>;
  @Select(EnvironmentalProjectState.environmentalProjectStorable)
  storable$: Observable<EnvironmentalProjectModel>;

  subscription: Subscription;

  value: Topic;

  constructor(
    private cd: ChangeDetectorRef,
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store
  ) {}

  ngOnInit() {}

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addTopic() {
    this.subscription = this.topics$.pipe(take(1)).subscribe((response) => {
      this.subscription = this.store
        .dispatch(
          new AddTopic({
            name: '',

            objectives: [],
            strategies: [],
            contents: [],
            levels: [],
          })
        )
        .subscribe(() => {
          this.subscription = this.storable$.subscribe((value) => {
            this.subscription = this.environmentalProjectService
              .updateEnvironmentalProject(value)
              .subscribe(
                (resp) => {
                  // Success
                },
                (err) => {
                  // Error
                }
              );
          });
        });
    });
  }
}
