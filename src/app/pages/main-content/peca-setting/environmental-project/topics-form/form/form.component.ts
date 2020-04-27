import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddSchoolLevel, DeleteTopic, EnvironmentalProjectModel, EnvironmentalProjectState } from 'src/app/store/environmental-project.action';
import { Level } from 'src/app/models/environmental-project.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Select(EnvironmentalProjectState.environmentalProjectStorable) storable$: Observable<EnvironmentalProjectModel>;
  subcription: Subscription;

  @Input() levels: Array<Level>; // <-- Obtain the school levels according to the topic
  @Input() index: number; // <-- This is the topic indexing

  form:FormGroup = new FormGroup({
    name: new FormControl()
  });

  objectives = new Array<any>();
  strategies = new Array<any>();
  contents = new Array<any>();
  

  constructor(private store: Store) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    if(this.subcription) {
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

  deleteHimself() : void {  

    // -- Action to delete topic --
    this.subcription = this.store.dispatch( new DeleteTopic( {
      name: this.form.controls.name.value,
      objectives: this.objectives,
      strategies: this.strategies,
      contents: this.contents,
    } , this.index ) ).subscribe( () => {



    });
  }

  onUpdateTopic() : void {
    
  }
}
