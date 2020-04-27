import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddSchoolLevel
  , DeleteTopic
  , EnvironmentalProjectModel
  , EnvironmentalProjectState
  , UpdateTopic } from 'src/app/store/environmental-project.action';
import { Level } from 'src/app/models/environmental-project.model';
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
  subcription: Subscription;

  @Input() levels: Array<Level>; // <-- Obtain the school levels according to the topic
  @Input() index: number; // <-- This is the topic indexing

  form: FormGroup = new FormGroup({
    name: new FormControl()
  });


  objectives = new Array<any>();
  strategies = new Array<any>();
  contents = new Array<any>();


  constructor(
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
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
    }, this.index));
  }

  // -- Action to delete topic --
  deleteHimself(): void {

    this.subcription = this.store.dispatch(new DeleteTopic(this.index)).subscribe(() => {

      this.subcription = this.storable$.subscribe(value => {

        this.subcription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --

        });
      });

    });
  }

  onUpdateTopic(): void {
    this.subcription = this.store.dispatch(new UpdateTopic({
      name: this.form.controls.name.value,
      objectives: this.objectives,
      strategies: this.strategies,
      contents: this.contents
    }, this.index)).subscribe(() => {

      this.subcription = this.storable$.subscribe(value => {


        this.subcription = this.environmentalProjectService.updateEnvironmentalProject(value).subscribe(response => {
          // -- Successfully mock delete topic --

        });

      });

    });
  }


}
