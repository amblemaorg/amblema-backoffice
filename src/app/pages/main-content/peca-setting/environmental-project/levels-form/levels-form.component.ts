import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
import { EnvironmentalProjectState, EnvironmentalProjectModel, DeleteSchoolLevel } from 'src/app/store/environmental-project.action';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-levels-form',
  templateUrl: './levels-form.component.html',
  styleUrls: ['./levels-form.component.scss']
})
export class LevelsFormComponent implements OnInit, OnDestroy {

  @Select(EnvironmentalProjectState.environmentalProjectStorable) storable$: Observable<EnvironmentalProjectModel>;
  subscription: Subscription;

  @Input() indexTopic: number; // <-- Index Topic
  @Input() index: number; // <-- Index level

  options = [
    { value: false, label: 'Preescolar' }, // <-- Prescolar 0
    { value: false, label: 'Primer grado' }, // <-- Primer grado 1
    { value: false, label: 'Segundo grado' }, // <-- Segundo grado 2
    { value: false, label: 'Tercer grado' }, // <-- Tercer grado 3
    { value: false, label: 'Cuarto grado' }, // <-- Cuarto grado 4
    { value: false, label: 'Quinto grado' }, // <-- Quinto grado 5
    { value: false, label: 'Sexto grado' }, // <-- Sexto grado 6
  ];

  form: FormGroup = new FormGroup( {
    week: new FormControl(),
    duration: new FormControl()
  }); 

  target = new Array<string>();
  techniques = new Array<string>();
  activities = new Array<string>();
  resources = new Array<string>();
  evaluations = new Array<string>();
  supportMaterial = new Array<string>();

  constructor(
    private environmentalProjectService: EnvironmentalProjectService,
    private store: Store ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      if ( this.subscription ) {
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

    // -- Get values --
    let levels: any[] = this.options;

    // -- Convert the label so that the backend can read it --
    levels.forEach( ( value, key ) => {
      value.label = key.toString();
    });

  }
}
