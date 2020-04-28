import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  AddSchoolLevel
  , DeleteTopic
  , EnvironmentalProjectModel
  , EnvironmentalProjectState
  , UpdateTopic
} from 'src/app/store/environmental-project.action';
import { Level, Lapse } from 'src/app/models/environmental-project.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @Select(EnvironmentalProjectState.environmentalProjectStorable) storable$: Observable<EnvironmentalProjectModel>;
  @Select(EnvironmentalProjectState.lapseSelected) lapse$: Observable<Lapse>;
  subscription: Subscription;

  @Input() levels: Array<Level>; // <-- Obtain the school levels according to the topic
  @Input() index: number; // <-- This is the topic indexing

  form: FormGroup = new FormGroup({
    name: new FormControl(null)
  });
  EnvironmentalProjectService;
  objectives = new Array<string>();
  strategies = new Array<string>();
  contents = new Array<string>();


  constructor(
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store) { }

  ngOnInit() {

    this.subscription = this.lapse$.subscribe(response => {

      response.topics.forEach((value, key) => {

        if (key === this.index) {

          this.form.patchValue(value);

          this.objectives = value.objectives;
          this.strategies = value.strategies;
          this.contents = value.contents;

          this.objectives = Object.assign([], this.objectives);
          this.strategies = Object.assign([], this.strategies);
          this.contents = Object.assign([], this.contents);

        }

      });

    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addLevel() {
    this.store.dispatch(new AddSchoolLevel({
      target: [],
      week: [],
      duration: '',
      techniques: [],
      activities: [],
      resources: [],
      evaluations: [],
      supportMaterial: [],
    }, this.index)).subscribe( () => {

      this.subscription = this.storable$.subscribe( value => {


        this.subscription = this.environmentalProjectService.updateEnvironmentalProject( value ).subscribe( response => {

        

        });
      } );

    });

  }

  // -- Action to delete topic --
  deleteHimself(): void {

    this.subscription = this.store.dispatch(new DeleteTopic(this.index)).subscribe(() => {

      this.subscription = this.storable$.subscribe(value => {

        this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --

        });
      });

    });
  }

  onUpdateTopic(): void {

    this.subscription = this.store.dispatch(new UpdateTopic({
      name: this.form.controls.name.value,
      objectives: this.objectives,
      strategies: this.strategies,
      contents: this.contents
    }, this.index)).subscribe(() => {

      this.subscription = this.storable$.subscribe(value => {

        this.subscription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --

        });

      });

    });
  }


}
