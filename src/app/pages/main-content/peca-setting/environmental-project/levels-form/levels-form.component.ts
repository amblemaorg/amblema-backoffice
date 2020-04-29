import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
import { EnvironmentalProjectState
  , EnvironmentalProjectModel
  , DeleteSchoolLevel
  , UpdateSchoolLevel } from 'src/app/store/environmental-project.action';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-levels-form',
  templateUrl: './levels-form.component.html',
  styleUrls: ['./levels-form.component.scss']
})
export class LevelsFormComponent implements OnInit, OnDestroy {

  @Select(EnvironmentalProjectState.environmentalProjectStorable) storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.environmentalProject) environmentalProjectSelected: Observable<EnvironmentalProjectModel>;
  subscription: Subscription;

  @Input() indexTopic: number; // <-- Index Topic
  @Input() index: number; // <-- Index level
  @Input() options: any[];


  // options = [
  //   { label: '0', value: false }, // <-- Prescolar 0
  //   { label: '1', value: false }, // <-- Primer grado 1
  //   { label: '2', value: false }, // <-- Segundo grado 2
  //   { label: '3', value: false }, // <-- Tercer grado 3
  //   { label: '4', value: false }, // <-- Cuarto grado 4
  //   { label: '5', value: false }, // <-- Quinto grado 5
  //   { label: '6', value: false }, // <-- Sexto grado 6
  // ];

  form: FormGroup;

  target = new Array<string>();
  techniques = new Array<string>();
  activities = new Array<string>();
  resources = new Array<string>();
  evaluations = new Array<string>();
  supportMaterial = new Array<string>();

  constructor(
    private cd: ChangeDetectorRef,
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store) { }

  ngOnInit() {


    this.form = new FormGroup({
      week: new FormControl(),
      duration: new FormControl()
    });

    // -- Set the value to the form --
    this.subscription = this.environmentalProjectSelected.subscribe(response => {

      response.lapseSelected.topics.forEach((topic, index) => {

        if (this.indexTopic === index ) {

          if (topic.levels.length >= 0) {

            topic.levels.forEach((value, key) => {

              if (key === this.index) {

                this.form.patchValue(value);

                this.options = value.target.length > 0 ? JSON.parse(JSON.stringify(value.target)) : this.options;

                this.techniques = Object.assign([], value.techniques);
                this.activities = Object.assign([], value.activities);
                this.resources = Object.assign([], value.resources);
                this.evaluations = Object.assign([], value.evaluations);
                this.supportMaterial = Object.assign([], value.supportMaterial);
              }

            });
          }

        }
      });
    });

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // -- Action to delete level --
  deleteHimself(): void {

    this.subscription = this.store.dispatch(new DeleteSchoolLevel(
      this.indexTopic,
      this.index
    )).subscribe(() => {

      this.subscription = this.storable$.subscribe(value => {

        this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --
        });
      });

    });
  }

  onUpdateLevel() {
    this.subscription = this.store.dispatch(new UpdateSchoolLevel({
      target: this.options,
      week: this.form.controls.week.value,
      duration: this.form.controls.duration.value,
      techniques: this.techniques,
      activities: this.activities,
      resources: this.resources,
      evaluations: this.evaluations,
      supportMaterial: this.supportMaterial
    },
      this.indexTopic,
      this.index
    )).subscribe(() => {

      this.subscription = this.storable$.subscribe(value => {
        this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --
        });
      });
    });
  }
}
