import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { EnvironmentalProjectService } from 'src/app/services/environmental-project.service';
import { EnvironmentalProjectState, EnvironmentalProjectModel, DeleteSchoolLevel } from 'src/app/store/environmental-project.action';

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
    { value: false, label: 'Preescolar' }, // <-- Prescolar
    { value: false, label: 'Primer grado' }, // <-- Primer grado
    { value: false, label: 'Segundo grado' }, // <-- Segundo grado
    { value: false, label: 'Tercer grado' }, // <-- Tercer grado
    { value: false, label: 'Cuarto grado' }, // <-- Cuarto grado
    { value: false, label: 'Quinto grado' }, // <-- Quinto grado
    { value: false, label: 'Sexto grado' }, // <-- Sexto grado
  ];

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
}
