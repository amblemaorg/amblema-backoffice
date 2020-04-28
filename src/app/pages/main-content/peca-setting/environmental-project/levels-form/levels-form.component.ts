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
    { value: false, label: '0' }, // <-- Prescolar 0
    { value: false, label: '1' }, // <-- Primer grado 1
    { value: false, label: '2' }, // <-- Segundo grado 2
    { value: false, label: '3' }, // <-- Tercer grado 3
    { value: false, label: '4' }, // <-- Cuarto grado 4
    { value: false, label: '5' }, // <-- Quinto grado 5
    { value: false, label: '6' }, // <-- Sexto grado 6
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



  }
}
